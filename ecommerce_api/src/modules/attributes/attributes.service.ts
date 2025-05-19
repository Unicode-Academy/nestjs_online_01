import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP } from 'src/constants/app';
import { Attribute } from 'src/entities/attribute.entity';
import { Brackets, Repository } from 'typeorm';

@Injectable()
export class AttributesService {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributesRepository: Repository<Attribute>,
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

    const queryBuilder = this.attributesRepository
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
    const data = await this.attributesRepository.findOne({
      where: {
        id,
      },
      relations,
    });

    return data;
  }

  async create(attributeData: any) {
    const dataCreate: any = { ...attributeData };
    const data = await this.attributesRepository.save(dataCreate);

    return data;
  }

  async update(attributeData: any, id: number) {
    await this.attributesRepository.update(id, attributeData);
    return this.find(id);
  }

  async delete(id: number) {
    const attribute = await this.find(id);

    if (!attribute) {
      return false;
    }

    await this.attributesRepository.delete(id);
    return attribute;
  }
}
