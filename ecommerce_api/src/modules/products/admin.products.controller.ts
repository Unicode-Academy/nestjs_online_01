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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VERSION } from 'src/constants/version';
import { ProductsService } from './products.service';
import CreateProductDto from './dto/create-product.dto';
import { successResponse } from 'src/utils/response';
import UpdateProductDto from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { getStorage, multerConfig } from 'src/config/multer';
import { APP } from 'src/constants/app';

@Controller({
  path: 'admin/products',
  version: VERSION.V1,
})
export class AdminProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  async findAll(@Query() query: any) {
    const [products, count] = await this.productsService.findAll(query);
    return successResponse(products, "Get all products's successfully", {
      total: count,
      page: query.page ? +query.page : 1,
    });
  }

  @Get(':id')
  async find(@Param('id') id: number, @Query() { include = '' }: any) {
    const product = await this.productsService.findOne(id, include);
    if (!product) {
      throw new NotFoundException('Product is not exist');
    }
    return successResponse(product, 'Get product successfully');
  }

  @Post()
  async create(@Body() body: CreateProductDto) {
    const data = await this.productsService.create(body);
    return successResponse(data, 'Product created successfully');
  }

  @Put(':id')
  async update(@Body() body: UpdateProductDto, @Param('id') id: number) {
    if (body.slug) {
      const existSlug = await this.productsService.findBySlug(body.slug, id);
      if (existSlug) {
        throw new BadRequestException('Slug is exist');
      }
    }

    const data = await this.productsService.update(body, id);
    if (!data) {
      throw new NotFoundException('Product is not exist');
    }
    return successResponse(data, 'Product updated successfully');
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const product = await this.productsService.delete(id);

    if (!product) {
      throw new NotFoundException('Product is not exist');
    }
    return successResponse(product, 'Product deleted successfully');
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: getStorage('/products'),
      fileFilter: multerConfig.fileFilter,
      limits: { fileSize: APP.MAX_IMAGE_SIZE },
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
