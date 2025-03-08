import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotAcceptableException,
  NotFoundException,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('my-courses')
  @UseGuards(AuthGuard)
  myCourses(@Req() request: Request & { user: { [key: string]: string } }) {
    const user = request.user;
    console.log(user);
  }

  @Put(':id/assign-roles')
  async assignRoles(@Body() body: any) {
    const { userId, roles } = body;
    const user = await this.usersService.find(userId);
    if (!user) {
      throw new NotFoundException('User is not exist');
    }
    if (!roles || !Array.isArray(roles)) {
      throw new BadRequestException('roles is required');
    }
    return this.usersService.assignRoles(user, roles);
  }

  @Get(':id/roles')
  async getRoles(@Param('id') id: number) {
    return this.usersService.roles(id);
  }
}
