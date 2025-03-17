import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Cache } from 'src/common/Cache';

@Module({
  controllers: [PostsController],
  providers: [PostsService, Cache],
})
export class PostsModule {}
