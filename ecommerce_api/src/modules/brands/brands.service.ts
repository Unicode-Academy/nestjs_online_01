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

    return [data, count];
  }

  async find(id: number, relations = {}) {
    return this.brandsRepository.findOne({
      where: {
        id,
      },
      relations,
    });
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

    return this.brandsRepository.save(dataCreate);
  }

  public async findBySlug(slug: string, id: number = 0) {
    const where: any = {
      slug,
    };
    if (id) {
      where.id = Not<number>(id);
    }
    return this.brandsRepository.findOne({
      where,
    });
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
