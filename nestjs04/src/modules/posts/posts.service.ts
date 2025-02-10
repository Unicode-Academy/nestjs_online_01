import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly categoriesService: CategoriesService,
  ) {}
  findAll() {
    return this.postsRepository.find({
      relations: {
        categories: true,
      },
    });
  }
  find(id: number) {
    return this.postsRepository.findOne({
      where: { id },
      relations: {
        categories: true,
      },
    });
  }

  async create(body: any) {
    const { categories, ...postFromBody } = body;
    const categoriesList = await Promise.all(
      categories.map((categoryId: number) => {
        return this.categoriesService.find(categoryId);
      }),
    );
    //categoryList là 1 mảng chứa các promise
    const post = this.postsRepository.create({
      ...postFromBody,
      categories: categoriesList,
    });
    await this.postsRepository.save(post);
    return post;
  }

  async update(id: number, body: any) {
    const { categories, ...postFromBody } = body;
    const categoriesList = await Promise.all(
      categories.map((categoryId: number) => {
        return this.categoriesService.find(categoryId);
      }),
    );
    const post = await this.postsRepository.findOne({
      where: { id },
    });
    const newPost = {
      ...post,
      ...postFromBody,
    };
    newPost.categories = categoriesList;

    await this.postsRepository.save(newPost);

    return post;
  }

  async remove(id: number) {
    //Xóa dữ liệu bảng trung gian
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: {
        categories: true,
      },
    });
    post.categories = [];
    await this.postsRepository.save(post);

    //Xóa post theo id
    await this.postsRepository.delete(id);
    return post;
  }
}
