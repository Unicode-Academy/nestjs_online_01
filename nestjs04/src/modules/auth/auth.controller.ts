import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  Req,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { he } from '@faker-js/faker/.';
import { AuthGuard } from 'src/guards/auth/auth.guard';

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
  @UseGuards(AuthGuard)
  async profile(@Req() request: Request & { user: { [key: string]: string } }) {
    return request.user;
  }

  @Post('refresh-token')
  async refreshToken(@Body() { refresh_token }: { refresh_token: string }) {
    const data = await this.authService.refreshToken(refresh_token);
    if (!data) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return data;
  }

  @Delete('revoke-refresh-token')
  async revokeRefreshToken(
    @Body() { refresh_token }: { refresh_token: string },
  ) {
    await this.authService.revokeRefreshToken(refresh_token);
    return {
      success: true,
      message: 'Refresh token has been revoked',
    };
  }

  @Delete('logout')
  @UseGuards(AuthGuard)
  async logout(@Req() request: Request & { user: { [key: string]: string } }) {
    const accessToken = request.user.access_token;
    const exp = request.user.token_exp;
    await this.authService.logout(accessToken, +exp);
    return {
      success: true,
      message: 'Logout successfully',
    };
  }
}
