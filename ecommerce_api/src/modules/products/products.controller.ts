import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { VERSION } from 'src/constants/version';

@Controller({
  path: 'products',
  version: VERSION.V1,
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
}
