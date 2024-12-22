import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  // Logger,
  Param,
  Post,
  Put,
  Query,
  // UsePipes,
  // ValidationPipe,
  // Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateValidationPipe } from 'src/validation/pipe';
// import { Response } from 'express';
// import { Request } from 'express';
// import CustomClass from 'src/core/CustomClass';

@Controller('users')
// @UsePipes(ValidationPipe)
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    // private readonly customClass: CustomClass,
  ) {
    console.log('user controller created');
  }
  private readonly logger = new Logger(UsersController.name);
  @Get() //users
  findAll() {
    // console.log(request.logging);

    // console.log(headers['x-api-key']);
    // this.customClass.something();
    // return this.userService.findAll();
    // response.set('x-abc', '123');
    // return response.status(201).json({
    //   message: 'Success',
    //   data: this.userService.findAll(),
    // });
    this.logger.log('findAll');

    return this.userService.findAll();
  }
  @Get('filters')
  filters(@Query() query: any) {
    //request -> validate -> service
    //service trả về dữ liệu sau khi xử lý xong
    //trả về http response (body, status, headers)
    return this.userService.filters(query);
  }

  @Get(':id') //users/1
  findOne(@Param('id') id: string) {
    const user = this.userService.findOne(id);
    // this.logger.error(`findOne ${id}`);
    if (!user) {
      // throw new NotFoundException('User not found');
      // return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      //   message: 'User not found',
      // });
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  @Post()
  create(@Body() body: CreateUserDto) {
    //Validate body trước khi đẩy sang service
    return this.userService.create(body);
  }
  @Put(':id/:slug')
  update(
    @Param('id') id: string,
    @Body(UpdateValidationPipe) body: UpdateUserDto,
  ) {
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

Route --> Controller --> Action --> Service

Service: Quản lý các logic nghiệp vụ

TH dùng sai: 
- Truy vấn database (câu lệnh sql)
- Trả về response
- Validate

Cách dùng đúng: 
- Nhận request từ controller gửi sang
- Xử lý các logic
- Gọi model hoặc repository để thao tác với database
- Trả về dữ liệu để controller xử lý tiếp

Trên thực tế: 
- Các service có thể lồng nhau
- Các service giữa các module có thể kế thừa với nhau

Ví dụ: 
Users
Auth --> Dùng lại UserService
*/

//SELECT id FROM users WHERE email = 'hoangan.web@gmail.com' AND id != 1
