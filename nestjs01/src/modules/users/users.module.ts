import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [ProductsModule],
})
export class UsersModule {}
