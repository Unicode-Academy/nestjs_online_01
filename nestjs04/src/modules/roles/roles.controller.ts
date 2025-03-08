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
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from 'src/entities/role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}
  @Get()
  findAll() {
    return this.roleService.findAll();
  }
  @Get(':id')
  async find(@Param('id') id: number) {
    const role = await this.roleService.find(id, true);
    if (!role) {
      throw new NotFoundException('Role is not exist');
    }
    return role;
  }
  @Post()
  create(@Body() body: Role) {
    if (!body.name) {
      throw new BadRequestException('Name is required');
    }
    return this.roleService.create(body);
  }
  @Patch(':id')
  async update(@Body() body: Role, @Param('id') id: number) {
    const role = await this.roleService.find(id);
    if (!role) {
      throw new NotFoundException('Role not exist');
    }

    return this.roleService.update(body, id);
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const role = await this.roleService.delete(id);
    if (!role) {
      throw new NotFoundException('Role is not exist');
    }
    return role;
  }
}
