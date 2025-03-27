import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/guards/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/auth/jwt-auth.guard';
import { GoogleAuthGuard } from 'src/guards/auth/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() request: Request & { user: any }) {
    console.log(request.user);
    return this.authService.login(request.user); //tạo jwt token
  }
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  loginGoogle() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  loginGoogleCallback(@Request() request: Request & { user: any }) {
    return this.authService.login(request.user); //tạo jwt token
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@Request() request: Request & { user: any }) {
    return request.user;
  }
}
