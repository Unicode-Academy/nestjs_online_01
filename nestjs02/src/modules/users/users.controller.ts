import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { TransformerInterceptor } from 'src/interceptor/transformer/transformer.interceptor';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { PermissionGuard } from 'src/guards/permission/permission.guard';
@UseInterceptors(new TransformerInterceptor())
@UseGuards(AuthGuard)
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
  @UseGuards(PermissionGuard)
  create() {
    return {
      id: 2,
      name: 'User 2',
      email: 'user2@gmail.com',
      status: false,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  @Get(':id')
  @UseGuards(PermissionGuard)
  findOne(@Param('id') id: string) {
    const user = this.users.find((user) => user.id === Number(id));
    if (!user) {
      throw new HttpException(`User #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
