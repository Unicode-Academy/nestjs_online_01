import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entites/user.entity';
import { Phone } from './entites/phone.entity';
export type QueryFindAll = {
  _sort: string;
  _order: string;
  q: string;
  _limit: number;
  _page: number;
  include: string;
};
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async findAll(
    @Query()
    query: QueryFindAll,
  ) {
    const [users, count] = await this.usersService.findAll(query);
    console.log('users', users);

    return {
      data: users,
      count,
      currentPage: query._page ? +query._page : 1,
    };
  }
  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Query() query: { include: string; [key: string]: string },
  ) {
    // const user = await this.usersService.findOne(id);
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }
    // return user;
    return this.usersService.findOne(id, query);
  }
  @Post()
  create(@Body() body: Partial<User & { phone: string }>) {
    return this.usersService.create(body);
  }

  @Patch(':id')
  update(@Body() user: Partial<User>, @Param('id') id: number) {
    return this.usersService.update(id, user);
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }

  @Delete()
  async deleteMany(@Body() body: number[]) {
    if (!body || !body?.length) {
      throw new BadRequestException('Vui lòng cung cấp id cần xóa');
    }
    const count = await this.usersService.deleteMany(body);
    if (!count) {
      return {
        success: false,
      };
    }
    return {
      success: true,
      deleteCount: count,
    };
  }
}
