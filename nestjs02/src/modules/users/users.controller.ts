import { Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { TransformerInterceptor } from 'src/interceptor/transformer/transformer.interceptor';
@UseInterceptors(TransformerInterceptor)
@Controller('users')
export class UsersController {
  private users = [
    {
      id: 1,
      name: 'User 1',
      email: 'user1@gmail.com',
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: 'User 2',
      email: 'user2@gmail.com',
      status: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.users;
  }
  @Post()
  create() {
    return 'created';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.users.find((user) => user.id === Number(id));
    return user;
  }
}
