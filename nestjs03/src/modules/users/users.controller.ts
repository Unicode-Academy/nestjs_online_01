import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entites/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    // const user = await this.usersService.findOne(id);
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }
    // return user;
    return this.usersService.findOne(id);
  }
  @Post()
  create(@Body() user: Partial<User>) {
    return this.usersService.create(user);
  }

  @Patch(':id')
  update(@Body() user: Partial<User>, @Param('id') id: number) {
    return this.usersService.update(id, user);
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
