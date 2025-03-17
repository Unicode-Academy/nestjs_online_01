import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'src/common/Cache';
const products = [
  {
    id: 1,
    name: 'Product 1',
    time: new Date().getTime(),
  },
  {
    id: 2,
    name: 'Product 2',
    time: new Date().getTime(),
  },
];
@Injectable()
export class ProductsService {
  constructor(@Inject(Cache) private cache: Cache) {}
  // @CacheKey('products') //Đặt key cho cache
  // @CacheTTL(10) //Thời gian cache
  async findAll() {
    const key = `products`;
    return this.cache.remember(key, () => this.getProductListFromDb());
  }

  async find(id: number) {
    const key = `product-${id}`;
    return this.cache.remember(key, () => this.getProductFromDb(id));
  }

  getProductFromDb(id: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = products.find((product) => product.id === id);
        resolve(product);
      }, 5000);
    });
  }

  getProductListFromDb() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, 5000);
    });
  }

  async clearCache(key: string) {
    return this.cache.forget(key);
  }
}
