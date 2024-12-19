import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import CustomClass from 'src/core/CustomClass';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, CustomClass],
  exports: [CustomClass],
})
export class ProductsModule {}
