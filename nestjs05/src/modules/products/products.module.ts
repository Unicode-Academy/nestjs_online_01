import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { Cache } from 'src/common/Cache';
@Module({
  controllers: [ProductsController],
  providers: [ProductsService, Cache],
})
export class ProductsModule {}
