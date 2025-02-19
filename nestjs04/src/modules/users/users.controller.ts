import { Controller, Get, Req, UseGuards } from '@nestjs/common';
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
}
