import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'src/common/Cache';
const posts = [
  {
    id: 1,
    title: 'Post 1',
  },
  {
    id: 2,
    title: 'Post 2',
  },
];
@Injectable()
export class PostsService {
  constructor(@Inject(Cache) private cache: Cache) {}

  findAll() {
    return this.getPostListFromDb();
  }

  getPostListFromDb() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(posts);
      }, 5000);
    });
  }

  clearCache(key: string) {
    return this.cache.forget(key);
  }
}
