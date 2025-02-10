import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get(':id/posts')
  getPosts(@Param('id') id: number) {
    return this.categoriesService.getPosts(id);
  }
}
