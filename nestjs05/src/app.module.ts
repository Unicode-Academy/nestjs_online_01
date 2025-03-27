import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PostsModule } from './modules/posts/posts.module';
import * as redisStore from 'cache-manager-redis-store';
import { createKeyv } from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task/task.service';
import { AppGateway } from './gateway/app/app.gateway';
import { NotificationGateway } from './gateway/notification/notification.gateway';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ProductsModule,
    // CacheModule.register({
    //   isGlobal: true,
    //   store: redisStore,
    //   host: 'localhost',
    //   port: 6379,
    // }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory(),
            }),
            createKeyv('redis://127.0.0.1:6379'),
          ],
        };
      },
    }),
    ScheduleModule.forRoot(),
    PostsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TaskService,
    AppGateway,
    NotificationGateway,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class AppModule {}
