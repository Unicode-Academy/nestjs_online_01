import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP } from 'src/constants/app';
import { Category } from 'src/entities/category.entity';
import { Brackets, Not, Repository } from 'typeorm';
import CreateCategoryDto from './dto/create-category.dto';
import { createSlug } from 'src/utils/url';
import { generateString } from 'src/utils/utils';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
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

    const queryBuilder = this.categoriesRepository
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

  async find(id: number) {
    return this.categoriesRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(categoryData: CreateCategoryDto) {
    const dataCreate: any = { ...categoryData };

    if (!dataCreate.slug) {
      const slug = createSlug(dataCreate.name);
      const slugExist = await this.findBySlug(slug);
      if (slugExist) {
        dataCreate.slug = `${slug}-${generateString(5)}`;
      } else {
        dataCreate.slug = slug;
      }
    }
    const parentId = categoryData.parent_id;
    if (parentId) {
      const parent = await this.categoriesRepository.findOne({
        where: {
          id: parentId,
        },
      });
      delete dataCreate.parent_id;
      dataCreate.parent = parent;
    }
    return this.categoriesRepository.save(dataCreate);
  }

  async update(categoryData: any, id: number) {
    const dataUpdate: any = { ...categoryData };
    const parentId = categoryData.parent_id;
    if (parentId) {
      const parent = await this.categoriesRepository.findOne({
        where: {
          id: parentId,
        },
      });
      delete dataUpdate.parent_id;
      dataUpdate.parent = parent;
    }
    await this.categoriesRepository.update(id, dataUpdate);
    return this.find(id);
  }

  public async findBySlug(slug: string, id: number = 0) {
    const where: any = {
      slug,
    };
    if (id) {
      where.id = Not<number>(id);
    }
    return this.categoriesRepository.findOne({
      where,
    });
  }
}
