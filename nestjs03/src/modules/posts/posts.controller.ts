import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from '../users/entites/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(+id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }

  @Get('user/:id')
  async findByUser(@Param('id') id: number) {
    //Lấy được user
    const posts = await this.postsService.findByUser(id);
    if (!posts || !posts.length) {
      throw new NotFoundException('Post not found');
    }
    return posts;
  }

  @Post('user/:id')
  async createPostByUser(
    @Param('id') userId: number,
    @Body() postBody: Partial<PostEntity>,
  ) {
    //Lấy được userId --> Lấy được user --> Thêm post
    return this.postsService.createPostByUser(userId, postBody);
  }
}
