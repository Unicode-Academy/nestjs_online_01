import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import { VERSION } from 'src/constants/version';
import { successResponse } from 'src/utils/response';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import RefreshTokenDto from './dto/refresh-token.dto';
import { RequestWithAuth } from 'src/types/RequestWithAuth';
import ForgotPasswordDto from './dto/forgot-password.dto';
import VerifyPasswordToken from './dto/verify-password-token.dto';
import { PasswordTokenService } from './password-token.service';

@Controller({
  path: 'auth',
  version: VERSION.V1,
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private passwordTokenService: PasswordTokenService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    const data = await this.authService.login(email, password);
    if (!data) {
      throw new UnauthorizedException('Unauthorized');
    }
    return successResponse(data, 'Login success');
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Request() request: RequestWithAuth) {
    return successResponse(request.user, 'Get profile success');
  }

  @Post('refresh-token')
  async refreshToken(@Body() { refresh_token }: RefreshTokenDto) {
    const data = await this.authService.refreshToken(refresh_token);
    if (!data) {
      throw new UnauthorizedException('Unauthorized');
    }
    return successResponse(data, 'Refresh token success');
  }

  @Post('forgot-password')
  async forgotPassword(@Body() { email }: ForgotPasswordDto) {
    const data = await this.authService.forgotPassword(email);
    if (!data) {
      throw new NotFoundException('User not found');
    }
    return successResponse({}, 'Forgot password success');
  }

  @Post('/verfiy-password-token')
  async verifyPasswordToken(@Body() { token }: VerifyPasswordToken) {
    const data = await this.passwordTokenService.verify(token);
    return data;
  }
}
