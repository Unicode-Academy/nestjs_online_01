import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth/social')
export class SocialLoginController {
  constructor(private readonly authService: AuthService) {}
  @Post('google')
  async googleLogin(
    @Body() { access_token }: { access_token: string },
    @Req() request: Request,
  ) {
    if (!access_token) {
      throw new BadRequestException('Access Token is required');
    }
    const userAgent = request.get('user-agent');
    if (!userAgent) {
      throw new BadRequestException('User agent is required');
    }
    const googleUser = await this.authService.getGoogleUser(access_token);
    return this.authService.loginGoogle(googleUser, userAgent);
  }
}
