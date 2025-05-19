import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { AdminProductsController } from './admin.products.controller';
import { BrandsModule } from '../brands/brands.module';
import { CategoriesModule } from '../categories/categories.module';
import { ProductImageService } from './product-image.service';
import { ProductImage } from 'src/entities/product-image.entity';
import { ProductAttributeValue } from 'src/entities/product-attribute-value.entity';
import { AttributesModule } from '../attributes/attributes.module';

@Module({
  controllers: [ProductsController, AdminProductsController],
  providers: [ProductsService, ProductImageService],
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage, ProductAttributeValue]),
    BrandsModule,
    CategoriesModule,
    AttributesModule,
  ],
})
export class ProductsModule {}
