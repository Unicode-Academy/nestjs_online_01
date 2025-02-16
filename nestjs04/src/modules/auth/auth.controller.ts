import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { he } from '@faker-js/faker/.';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }) {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }
    const user = await this.authService.checkAuth(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return {
      access_token: user,
    };
  }

  @Get('profile')
  async profile(@Headers() headers: any) {
    const token = headers.authorization.split(' ').slice(-1).join();
    const user = await this.authService.getUser(token);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
