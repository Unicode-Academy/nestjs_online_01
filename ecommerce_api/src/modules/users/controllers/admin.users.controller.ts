import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { VERSION } from 'src/constants/version';
import Hash from 'src/utils/hashing';
import CreateUserDto from '../dto/create-user.dto';
import { successResponse } from 'src/utils/response';
import { UsersService } from '../users.service';
import UpdateUserDto from '../dto/update-user.dto';

@Controller({
  path: 'admin/users',
  version: VERSION.V1,
})
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async findAll(@Query() query: any) {
    const [users, count] = await this.usersService.findAll(query);
    return successResponse(users, "Get all user's successfully", {
      total: count,
      page: query.page ? +query.page : 1,
    });
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    const user = await this.usersService.find(id);
    return successResponse(user, "User's information");
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    //Kiểm tra email trùng lặp
    const existEmail = await this.usersService.existEmail(body.email);
    if (existEmail) {
      throw new BadRequestException('Email đã tồn tại');
    }
    const user = await this.usersService.create(body);
    return successResponse(user, 'User created successfully');
  }

  @Put(':id')
  async update(@Body() body: UpdateUserDto, @Param('id') id: number) {
    //Kiểm tra id có tồn tại không?
    const user = await this.usersService.find(id);
    const existEmail = await this.usersService.existEmail(body.email, id);
    if (existEmail) {
      throw new BadRequestException('Email đã tồn tại');
    }
    const updateStatus = await this.usersService.update(body, id);
    if (!updateStatus.affected) {
      throw new InternalServerErrorException('Update failed');
    }
    return successResponse({ ...user, ...body }, 'User updated successfully');
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const user = await this.usersService.delete(id);
    return successResponse(user, 'User deleted successfully');
  }
}
