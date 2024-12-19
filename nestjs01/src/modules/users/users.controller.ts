import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import CustomClass from 'src/core/CustomClass';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly customClass: CustomClass,
  ) {}
  @Get() //users
  findAll(@Res() response: Response) {
    // console.log(headers['x-api-key']);
    // this.customClass.something();
    // return this.userService.findAll();
    response.set('x-abc', '123');
    return response.status(201).json({
      message: 'Success',
      data: this.userService.findAll(),
    });
  }
  @Get('filters')
  filters(@Query() query: any) {
    return this.userService.filters(query);
  }

  @Get(':id') //users/1
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @Post()
  create(@Body() body: any) {
    return this.userService.create(body);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.userService.update(id, body);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

/*
class A {
  constructor(b) {}
}

class B {

}

const b = new B();
const a = new A(b);
*/
