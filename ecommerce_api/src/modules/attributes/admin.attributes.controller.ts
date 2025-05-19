import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VERSION } from 'src/constants/version';
import { AttributesService } from './attributes.service';
import { AdminAuthGuard } from 'src/common/guards/auth/admin.auth.guard';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { successResponse } from 'src/utils/response';
import CreateAttributeDto from './dto/create-attribute.dto';
import UpdateAttributeDto from './dto/update-attribute.dto';

@Controller({
  path: 'admin/attributes',
  version: VERSION.V1,
})
@UseGuards(AuthGuard, AdminAuthGuard)
export class AdminAttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @Get()
  async findAll(@Query() query: any) {
    const [users, count] = await this.attributesService.findAll(query);
    return successResponse(users, "Get all attribute's successfully", {
      total: count,
      page: query.page ? +query.page : 1,
    });
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    const attribute = await this.attributesService.find(id);
    if (!attribute) {
      throw new NotFoundException('Brand is not exist');
    }
    return successResponse(attribute, 'Get brand successfully');
  }

  @Post()
  async create(@Body() body: CreateAttributeDto) {
    const data = await this.attributesService.create(body);
    return successResponse(data, 'Attribute created successfully');
  }

  @Put(':id')
  async update(@Body() body: UpdateAttributeDto, @Param('id') id: number) {
    const data = await this.attributesService.update(body, id);
    if (!data) {
      throw new NotFoundException('Attribute is not exist');
    }
    return successResponse(data, 'Attribute updated successfully');
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const attribute = await this.attributesService.delete(id);

    if (!attribute) {
      throw new NotFoundException('Attribute is not exist');
    }
    return successResponse(attribute, 'Attribute deleted successfully');
  }
}
