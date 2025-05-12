import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP } from 'src/constants/app';
import { Brand } from 'src/entities/brand.entity';
import { Brackets, Not, Repository } from 'typeorm';
import CreateBrandDto from './dto/create-brand.dto';
import { createSlug } from 'src/utils/url';
import { generateString } from 'src/utils/utils';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandsRepository: Repository<Brand>,
  ) {}

  async findAll(query: any) {
    const {
      page = 1,
      limit = APP.PER_PAGE_ADMIN,
      order = 'ASC',
      sort = 'id',
      q = '',
      status = '',
    } = query;

    const queryBuilder = this.brandsRepository
      .createQueryBuilder()
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(`${sort}`, order);

    if (status === 'active' || status === 'inactive') {
      queryBuilder.andWhere('status = :status', { status });
    }

    if (q) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('name LIKE :q', { q: `%${q}%` });
        }),
      );
    }

    const data = await queryBuilder.getMany();
    const count = await queryBuilder.getCount();

    return [
      data.map((item) => ({
        ...item,
        image: item.image ? `${process.env.APP_URL}/${item.image}` : null,
      })),
      count,
    ];
  }

  async find(id: number, relations = {}) {
    const data = await this.brandsRepository.findOne({
      where: {
        id,
      },
      relations,
    });
    if (data.image) {
      data.image = `${process.env.APP_URL}/${data.image}`;
    }
    return data;
  }

  async create(brandData: CreateBrandDto) {
    const dataCreate: any = { ...brandData };

    if (!dataCreate.slug) {
      const slug = createSlug(dataCreate.name);
      const slugExist = await this.findBySlug(slug);
      if (slugExist) {
        dataCreate.slug = `${slug}-${generateString(5)}`;
      } else {
        dataCreate.slug = slug;
      }
    }

    const data = await this.brandsRepository.save(dataCreate);
    if (data.image) {
      data.image = `${process.env.APP_URL}/${data.image}`;
    }
    return data;
  }

  public async findBySlug(slug: string, id: number = 0) {
    const where: any = {
      slug,
    };
    if (id) {
      where.id = Not<number>(id);
    }
    const data = await this.brandsRepository.findOne({
      where,
    });
    if (data.image) {
      data.image = `${process.env.APP_URL}/${data.image}`;
    }
    return data;
  }

  async update(brandData: any, id: number) {
    await this.brandsRepository.update(id, brandData);
    return this.find(id);
  }

  public async delete(id: number) {
    const brand = await this.find(id);

    if (!brand) {
      return false;
    }

    await this.brandsRepository.delete(id);
    return brand;
  }
}
