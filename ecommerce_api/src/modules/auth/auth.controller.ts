import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Patch,
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
import ResetPasswordDto from './dto/reset-password.dto';
import { MailerService } from '@nestjs-modules/mailer';
import ForgotPasswordNotification from 'src/common/notifications/forgot-password.notification';
import ResetPasswordNotification from 'src/common/notifications/reset-password.notification';

@Controller({
  path: 'auth',
  version: VERSION.V1,
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private passwordTokenService: PasswordTokenService,
    private readonly forgotPasswordNotification: ForgotPasswordNotification,
    private readonly resetPasswordNotification: ResetPasswordNotification,
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
    //Gửi email cho user
    this.forgotPasswordNotification.send({
      name: data.user.name,
      email,
      token: data.token,
      expire_at: data.expire_at,
    });

    return successResponse({}, 'Forgot password success');
  }

  @Post('verfiy-password-token')
  async verifyPasswordToken(@Body() { token }: VerifyPasswordToken) {
    const data = await this.passwordTokenService.verify(token);
    if (!data) {
      throw new UnauthorizedException('Unauthorized');
    }
    return data;
  }

  @Patch('reset-password')
  async resetPassword(@Body() { token, password }: ResetPasswordDto) {
    const data = await this.passwordTokenService.updatePassword(
      password,
      token,
    );
    if (!data) {
      throw new InternalServerErrorException('Reset password failed');
    }
    //Nếu thành công --> gọi hàm thu hồi token --> bảo mật
    await this.passwordTokenService.revoktoken(token);
    this.resetPasswordNotification.send(data);
    return successResponse({}, 'Reset password success');
  }
}
