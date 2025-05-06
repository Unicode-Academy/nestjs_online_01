import {
  BadRequestException,
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
import { CategoriesService } from './categories.service';
import { successResponse } from 'src/utils/response';
import { VERSION } from 'src/constants/version';
import CreateCategoryDto from './dto/create-category.dto';
import UpdateCategoryDto from './dto/update-category.dto';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { AdminAuthGuard } from 'src/common/guards/auth/admin.auth.guard';

@Controller({
  path: 'admin/categories',
  version: VERSION.V1,
})
@UseGuards(AuthGuard, AdminAuthGuard)
export class AdminCategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  async findAll(@Query() query: any) {
    const [users, count] = await this.categoriesService.findAll(query);
    return successResponse(users, "Get all categories's successfully", {
      total: count,
      page: query.page ? +query.page : 1,
    });
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    const category = await this.categoriesService.find(id);
    if (!category) {
      throw new NotFoundException('Category is not exist');
    }
    return successResponse(category, 'Get category successfully');
  }

  @Post()
  async create(
    @Body() { name, slug, status, parent_id, description }: CreateCategoryDto,
  ) {
    const data = await this.categoriesService.create({
      name,
      slug,
      status,
      parent_id,
      description,
    });
    return successResponse(data, 'Category created successfully');
  }

  @Put(':id')
  async update(
    @Body() { name, slug, status, parent_id, description }: UpdateCategoryDto,
    @Param('id') id: number,
  ) {
    if (slug) {
      const existSlug = await this.categoriesService.findBySlug(slug, id);
      if (existSlug) {
        throw new BadRequestException('Slug is exist');
      }
    }

    const data = await this.categoriesService.update(
      {
        name,
        slug,
        status,
        parent_id,
        description,
      },
      id,
    );
    if (!data) {
      throw new NotFoundException('Category is not exist');
    }
    return successResponse(data, 'Category updated successfully');
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const category = await this.categoriesService.delete(id);

    if (!category) {
      throw new NotFoundException('Category is not exist');
    }
    return successResponse(category, 'Category deleted successfully');
  }
}
