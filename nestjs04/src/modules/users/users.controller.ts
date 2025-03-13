import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotAcceptableException,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { PermissionGuard } from 'src/guards/permission/permission.guard';
import { getPermissions } from 'src/utils/utils';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @UseGuards(PermissionGuard('users.read'))
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @UseGuards(PermissionGuard('users.create'))
  create(@Body() body: any) {
    return body;
  }

  @Get('my-courses')
  // @UseGuards(AuthGuard)
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

  @Get('my-permissions')
  getPermissions(
    @Req() request: Request & { user: { [key: string]: string } },
  ) {
    const user = request.user;
    const permissions = getPermissions(user);
    return permissions;
  }
}
