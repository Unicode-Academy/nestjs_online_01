import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { VERSION } from 'src/constants/version';
import { errorResponse, successResponse } from 'src/utils/response';

@Controller({
  path: 'users',
  version: VERSION.V1,
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    const users = [
      {
        id: 1,
        name: 'User 1',
      },
      {
        id: 2,
        name: 'User 2',
      },
      {
        id: 3,
        name: 'User 3',
      },
    ];
    const meta = {
      total: 10,
      currentPage: 1,
    };
    throw new NotFoundException('User not found');
    // return successResponse(users, 'Get users success', meta);
  }
}
