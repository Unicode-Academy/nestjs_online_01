import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminAuthGuard } from 'src/common/guards/auth/admin.auth.guard';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { VERSION } from 'src/constants/version';
import { BrandsService } from './brands.service';
import { successResponse } from 'src/utils/response';
import CreateBrandDto from './dto/create-brand.dto';
import UpdateBrandDto from './dto/update-brand.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuid } from 'uuid';
import { APP } from 'src/constants/app';
import * as multer from 'multer';
import { FileUploadInterceptor } from 'src/common/interceptors/file-upload.interceptor';
import { getStorage, multerConfig } from 'src/config/multer';

@Controller({
  version: VERSION.V1,
  path: 'admin/brands',
})
@UseGuards(AuthGuard, AdminAuthGuard)
export class AdminBrandsController {
  constructor(private readonly brandsService: BrandsService) {}
  @Get()
  async findAll(@Query() query: any) {
    const [users, count] = await this.brandsService.findAll(query);
    return successResponse(users, "Get all brands's successfully", {
      total: count,
      page: query.page ? +query.page : 1,
    });
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    const brand = await this.brandsService.find(id);
    if (!brand) {
      throw new NotFoundException('Brand is not exist');
    }
    return successResponse(brand, 'Get brand successfully');
  }

  @Post()
  async create(@Body() { name, slug, status }: CreateBrandDto) {
    const data = await this.brandsService.create({
      name,
      slug,
      status,
    });
    return successResponse(data, 'Brand created successfully');
  }

  @Put(':id')
  async update(
    @Body() { name, slug, status }: UpdateBrandDto,
    @Param('id') id: number,
  ) {
    if (slug) {
      const existSlug = await this.brandsService.findBySlug(slug, id);
      if (existSlug) {
        throw new BadRequestException('Slug is exist');
      }
    }

    const data = await this.brandsService.update(
      {
        name,
        slug,
        status,
      },
      id,
    );
    if (!data) {
      throw new NotFoundException('Brand is not exist');
    }
    return successResponse(data, 'Brand updated successfully');
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const category = await this.brandsService.delete(id);

    if (!category) {
      throw new NotFoundException('Brand is not exist');
    }
    return successResponse(category, 'Brand deleted successfully');
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: getStorage('/brands'),
      fileFilter: multerConfig.fileFilter,
      limits: { fileSize: 1024 * 1024 }, // Limit file size to 1MB
    }),
  )
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return successResponse(
      {
        path: file.path,
      },
      'Upload file successfully',
    );
  }
}
