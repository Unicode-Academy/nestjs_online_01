import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttributeValue } from 'src/entities/attribute-value.entity';
import { Attribute } from 'src/entities/attribute.entity';
import { Repository } from 'typeorm';
import { AttributesService } from './attributes.service';

@Injectable()
export class ValueService {
  constructor(
    @InjectRepository(AttributeValue)
    private readonly valueRepository: Repository<AttributeValue>,
    private readonly attributesService: AttributesService,
  ) {}

  async findAll(attributeId: number) {
    const attribute = await this.attributesService.find(attributeId, {
      values: true,
    });
    if (!attribute) {
      return;
    }
    return attribute.values;
  }

  async find(id: number, relations: any = {}) {
    return await this.valueRepository.findOne({
      where: {
        id,
      },
      relations,
    });
  }

  async create(data: any, attribute: Attribute) {
    const dataCreate = { ...data };
    dataCreate.attribute = attribute;
    return await this.valueRepository.save(dataCreate);
  }

  async update(data: any, id: number) {
    await this.valueRepository.update(id, data);
    return this.find(id);
  }

  async delete(id: number) {
    const value = await this.find(id);
    await this.valueRepository.delete(id);
    return value;
  }

  async deleteAll(attribute: Attribute) {
    await this.valueRepository.delete({
      attribute,
    });
  }
}
