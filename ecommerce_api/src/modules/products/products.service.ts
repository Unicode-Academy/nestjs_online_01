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

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly brandsService: BrandsService,
    private readonly categoriesService: CategoriesService,
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
    const { brand_id, category, ...dataCreate }: any = {
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

    const data = await this.productsRepository.save(dataCreate);
    if (data.thumbnail) {
      data.thumbnail = `${process.env.APP_URL}/${data.thumbnail}`;
    }
    return data;
  }

  async update(productData: any, id: number) {
    const { brand_id, ...dataUpdate }: any = {
      ...productData,
    };

    const relations: {
      brand?: boolean;
    } = {};
    if (brand_id) {
      const brand = await this.brandsService.find(brand_id);
      dataUpdate.brand = brand;
      relations.brand = true;
    }

    await this.productsRepository.update(id, dataUpdate);
    return this.find(id, relations);
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
    });

    if (!product) {
      return false;
    }

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
