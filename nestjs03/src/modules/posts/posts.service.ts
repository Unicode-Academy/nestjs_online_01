import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../users/entites/post.entity';

@Injectable()
export class PostsService {
  constructor(
    // private readonly usersService: UsersService,
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
  ) {}
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return this.postsRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  async findByUser(userId: number) {
    // const user = await this.usersService.findOne(userId);
    // if (!user) {
    //   return false;
    // }
    // return user.posts;
    return [];
  }

  async createPostByUser(userId: number, postBody: Partial<Post>) {
    // const user = await this.usersService.findOne(userId);
    // const post = this.postsRepository.create({ ...postBody, user });
    // return await this.postsRepository.save(post);
    return [];
  }

  removeByUser(userId: number) {
    return this.postsRepository.delete({
      user: {
        id: userId,
      },
    });
  }
}
