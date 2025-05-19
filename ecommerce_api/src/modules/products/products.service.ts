import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Brackets, Not, Repository } from 'typeorm';
import CreateProductDto from './dto/create-product.dto';
import { createSlug } from 'src/utils/url';
import { generateString } from 'src/utils/utils';
import { BrandsService } from '../brands/brands.service';
import { Brand } from 'src/entities/brand.entity';
import { APP } from 'src/constants/app';
import * as fs from 'fs';
import { CategoriesService } from '../categories/categories.service';
import { ProductImageService } from './product-image.service';
import { ProductAttributeValue } from 'src/entities/product-attribute-value.entity';
import { ValueService } from '../attributes/value.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly brandsService: BrandsService,
    private readonly categoriesService: CategoriesService,
    private readonly productImagesService: ProductImageService,
    @InjectRepository(ProductAttributeValue)
    private readonly productAttributeValueRepository: Repository<ProductAttributeValue>,
    private readonly attributeValuesService: ValueService,
  ) {}

  async findAll(query: any) {
    const {
      page = 1,
      limit = APP.PER_PAGE_ADMIN,
      order = 'ASC',
      sort = 'id',
      q = '',
      status = '',
      include = '',
    } = query;

    const queryBuilder = this.productsRepository
      .createQueryBuilder('products')
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(`products.${sort}`, order);

    if (status === 'active' || status === 'inactive') {
      queryBuilder.andWhere('status = :status', { status });
    }

    if (q) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('name LIKE :q', { q: `%${q}%` });
          qb.orWhere('content LIKE :q', { q: `%${q}%` });
        }),
      );
    }
    if (include) {
      const includes = include.split(',');
      includes.forEach((item: string) => {
        queryBuilder.leftJoinAndSelect(`products.${item}`, item);
      });
    }

    const data = await queryBuilder.getMany();
    const count = await queryBuilder.getCount();

    return [
      data.map((item) => ({
        ...item,
        thumbnail: item.thumbnail
          ? `${process.env.APP_URL}/${item.thumbnail}`
          : null,
      })),
      count,
    ];
  }
  async findOne(id: number, include: string) {
    const relations = {};
    if (include) {
      const includes = include.split(',');
      includes.forEach((item) => {
        relations[item] = true;
      });
    }
    return this.find(id, relations);
  }
  async find(id: number, relations = {}) {
    const data = await this.productsRepository.findOne({
      where: {
        id,
      },
      relations,
    });
    if (!data) {
      return;
    }
    if (data.thumbnail) {
      data.thumbnail = `${process.env.APP_URL}/${data.thumbnail}`;
    }
    return data;
  }
  async create(productData: CreateProductDto) {
    const { brand_id, category, images, ...dataCreate }: any = {
      ...productData,
    };

    if (!dataCreate.slug) {
      const slug = createSlug(dataCreate.name);
      const slugExist = await this.findBySlug(slug);
      if (slugExist) {
        dataCreate.slug = `${slug}-${generateString(5)}`;
      } else {
        dataCreate.slug = slug;
      }
    }

    if (brand_id) {
      const brand = await this.brandsService.find(brand_id);
      dataCreate.brand = brand;
    }

    const categories = await Promise.all(
      category.map((categoryId: number) => {
        return this.categoriesService.find(categoryId);
      }),
    );
    dataCreate.categories = categories;

    //Cập nhật bảng products
    const data = await this.productsRepository.save(dataCreate);

    //Lấy thông tin product để lưu vào bảng product_images
    if (images) {
      const product = await this.find(data.id);
      const imageFilter = images.filter(
        (item: string) => typeof item === 'string',
      );
      await Promise.all(
        imageFilter.map((item: string) => {
          return this.productImagesService.create({ image: item, product });
        }),
      );
      data.images = imageFilter;
    }

    if (data.thumbnail) {
      data.thumbnail = `${process.env.APP_URL}/${data.thumbnail}`;
    }
    return data;
  }

  async update(productData: any, id: number) {
    const { brand_id, category, images, attribute_values, ...dataUpdate }: any =
      {
        ...productData,
      };

    const relations: {
      brand?: boolean;
      categories?: boolean;
      images?: boolean;
    } = {};

    if (brand_id) {
      const brand = await this.brandsService.find(brand_id);
      dataUpdate.brand = brand;
      relations.brand = true;
    }

    await this.productsRepository.update(id, dataUpdate);

    relations.images = true;

    const product = await this.find(id, relations);

    if (category) {
      const categories = await Promise.all(
        category.map((categoryId: number) => {
          return this.categoriesService.find(categoryId);
        }),
      );
      product.categories = categories;
      await this.productsRepository.save(product);
    }

    if (images) {
      const imageFilter = images.filter(
        (item: string) => typeof item === 'string',
      );
      await Promise.all(
        product.images.map((item: any) => {
          return this.productImagesService.delete(item.id);
        }),
      );
      await Promise.all(
        imageFilter.map((item: string) => {
          return this.productImagesService.create({
            image: item,
            product,
          });
        }),
      );
      product.images = imageFilter;
    }

    if (attribute_values) {
      await Promise.all(
        attribute_values.map(async (valueId: number) => {
          const value = await this.attributeValuesService.find(valueId, {
            attribute: true,
          });
          const attribute = value.attribute;

          return this.productAttributeValueRepository.save({
            product,
            attribute,
            attributeValue: value,
          });
        }),
      );
    }

    return product;
  }

  public async findBySlug(slug: string, id: number = 0) {
    const where: any = {
      slug,
    };
    if (id) {
      where.id = Not<number>(id);
    }
    const data = await this.productsRepository.findOne({
      where,
    });
    if (!data) {
      return;
    }
    if (data.thumbnail) {
      data.thumbnail = `${process.env.APP_URL}/${data.thumbnail}`;
    }
    return data;
  }

  async delete(id: number) {
    const product = await this.productsRepository.findOne({
      where: {
        id,
      },
      relations: {
        images: true,
      },
    });

    if (!product) {
      return false;
    }

    //Xóa dữ liệu bảng product_images
    if (product.images) {
      await Promise.all(
        product.images.map((item: any) => {
          return this.productImagesService.delete(item.id);
        }),
      );
    }

    //Xóa dữ liệu bảng products
    await this.productsRepository.delete(id);

    if (
      product.thumbnail &&
      fs.existsSync(`${process.cwd()}/${product.thumbnail}`)
    ) {
      fs.unlinkSync(`${process.cwd()}/${product.thumbnail}`);
    }

    return product;
  }
}
