import { Body, Controller, Delete, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  // @CacheKey('posts')
  // @CacheTTL(5000)
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Delete('cache')
  async clearCached(@Body() { key = '' }: { key?: string }) {
    return this.postsService.clearCache(key);
  }
}
