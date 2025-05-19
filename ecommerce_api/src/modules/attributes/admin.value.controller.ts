import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VERSION } from 'src/constants/version';
import { ValueService } from './value.service';
import CreateValueDto from './dto/create-value.dto';
import { AttributesService } from './attributes.service';
import { successResponse } from 'src/utils/response';
import UpdateValueDto from './dto/update-value.dto';

@Controller({
  path: 'admin/attributes',
  version: VERSION.V1,
})
export class AdminValueController {
  constructor(
    private readonly valueService: ValueService,
    private readonly attributesService: AttributesService,
  ) {}

  @Get(':attributeId/values')
  async findAll(@Param('attributeId') attributeId: number) {
    const data = await this.valueService.findAll(attributeId);
    if (!data) {
      throw new NotFoundException('Attribute is not exist');
    }
    return successResponse(data, 'Get values successfully');
  }

  @Post(':attributeId/values')
  async create(
    @Param('attributeId') attributeId: number,
    @Body() body: CreateValueDto,
  ) {
    const attribute = await this.attributesService.find(attributeId);
    if (!attribute) {
      throw new NotFoundException('Attribute is not exist');
    }
    const data = await this.valueService.create(body, attribute);
    return successResponse(data, 'Value created successfully');
  }

  @Put(':attributeId/values/:id')
  async update(
    @Param('attributeId') attributeId: number,
    @Param('id') id: number,
    @Body() body: UpdateValueDto,
  ) {
    const attribute = await this.attributesService.find(attributeId);
    if (!attribute) {
      throw new NotFoundException('Attribute is not exist');
    }
    const value = await this.valueService.find(id);
    if (!value) {
      throw new NotFoundException('Value is not exist');
    }
    const data = await this.valueService.update(body, id);
    return successResponse(data, 'Value updated successfully');
  }

  @Delete(':attributeId/values/:id')
  async delete(
    @Param('id') id: number,
    @Param('attributeId') attributeId: number,
  ) {
    const attribute = await this.attributesService.find(attributeId);
    if (!attribute) {
      throw new NotFoundException('Attribute is not exist');
    }
    const value = await this.valueService.find(id);
    if (!value) {
      throw new NotFoundException('Value is not exist');
    }
    const data = await this.valueService.delete(id);
    return successResponse(data, 'Value deleted successfully');
  }

  @Delete(':attributeId/values')
  async deleteAll(@Param('attributeId') attributeId: number) {
    const attribute = await this.attributesService.find(attributeId);
    if (!attribute) {
      throw new NotFoundException('Attribute is not exist');
    }
    const data = await this.valueService.deleteAll(attribute);
    return successResponse(data, 'Value deleted successfully');
  }
}
