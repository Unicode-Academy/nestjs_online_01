import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.postsService.find(+id);
  }
  @Post()
  create(@Body() body: any) {
    return this.postsService.create(body);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any) {
    //Check quyền xem có quyền update bản ghi tương ứng với id không?
    // const post = this.postsService.find(id);
    // if (post.user_id !== loginUserId) {

    // }
    return this.postsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postsService.remove(id);
  }
}
