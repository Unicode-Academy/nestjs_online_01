import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entites/user.entity';
import { PhonesModule } from '../phones/phones.module';
import { PostsService } from '../posts/posts.service';
import { Post } from './entites/post.entity';
import { PostsModule } from '../posts/posts.module';

@Module({
  controllers: [UsersController],
  providers: [PostsService, UsersService],
  imports: [TypeOrmModule.forFeature([User, Post]), PhonesModule, PostsModule],
  // exports: [UsersService],
})
export class UsersModule {}
