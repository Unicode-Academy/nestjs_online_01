import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entites/user.entity';
import { PhonesModule } from '../phones/phones.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), PhonesModule],
})
export class UsersModule {}
