import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { TransformerInterceptor } from 'src/interceptor/transformer/transformer.interceptor';

@Controller('products')
@UseInterceptors(TransformerInterceptor)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  findAll() {
    const products = [
      {
        id: 1,
        name: 'Product 1',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Product 2',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    return products;
  }
}
