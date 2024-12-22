import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
import { RoleMiddleware } from './middlewares/role/role.middleware';

@Module({
  imports: [UsersModule, ProductsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, RoleMiddleware).forRoutes(
      {
        path: '/users',
        method: RequestMethod.ALL,
      },
      {
        path: '/users/*',
        method: RequestMethod.ALL,
      },
    );
  }
}
