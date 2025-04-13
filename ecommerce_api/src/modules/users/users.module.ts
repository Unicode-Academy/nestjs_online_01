import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminUsersController } from './controllers/admin.users.controller';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  controllers: [AdminUsersController, UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule {}
