import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.productsService.find(+id);
  }

  @Delete('cache')
  async clearCached(@Body() { key = '' }: { key?: string }) {
    return this.productsService.clearCache(key);
  }
}
