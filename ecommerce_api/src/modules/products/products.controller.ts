import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { VERSION } from 'src/constants/version';
import { successResponse } from 'src/utils/response';

@Controller({
  path: 'products',
  version: VERSION.V1,
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get(':id')
  async find(@Param('id') id: number, @Query() { include = '' }: any) {
    const product = await this.productsService.findOne(id, include, true);
    if (!product) {
      throw new NotFoundException('Product is not exist');
    }
    return successResponse(product, 'Get product successfully');
  }
}
