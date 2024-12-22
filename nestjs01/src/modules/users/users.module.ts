import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProductsModule } from '../products/products.module';
import DatabaseService from 'src/db/database.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, DatabaseService],
  imports: [ProductsModule],
  exports: [UsersService],
})
export class UsersModule {}
