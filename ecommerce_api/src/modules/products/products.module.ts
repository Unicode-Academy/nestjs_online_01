import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { AdminProductsController } from './admin.products.controller';
import { BrandsModule } from '../brands/brands.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  controllers: [ProductsController, AdminProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product]),
    BrandsModule,
    CategoriesModule,
  ],
})
export class ProductsModule {}
