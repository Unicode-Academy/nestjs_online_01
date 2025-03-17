import { CACHE_MANAGER, Cache as CacheManager } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cacheable } from 'cacheable';
import Keyv from 'keyv';

export class Cache {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: CacheManager) {}
  async remember(key: string, callback: () => any, ttl = 0) {
    const data = await this.cacheManager.get(key);
    if (!data) {
      const result = await callback();
      await this.cacheManager.set(key, JSON.stringify(result), ttl);
      return result;
    }
    return JSON.parse(data as string);
  }

  async forget(key: string = '') {
    try {
      if (!key) {
        await this.cacheManager.clear();
        return true;
      }
      return this.cacheManager.del(key);
    } catch (error) {
      console.log(error);
    }
  }
}
