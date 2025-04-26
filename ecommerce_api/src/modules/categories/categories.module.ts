import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { AdminCategoriesController } from './admin.categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';

@Module({
  controllers: [CategoriesController, AdminCategoriesController],
  providers: [CategoriesService],
  imports: [TypeOrmModule.forFeature([Category])],
})
export class CategoriesModule {}
