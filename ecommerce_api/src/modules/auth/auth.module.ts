import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PasswordTokenService } from './password-token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordToken } from 'src/entities/password_token.entity';
import ForgotPasswordNotification from 'src/common/notifications/forgot-password.notification';
import ResetPasswordNotification from 'src/common/notifications/reset-password.notification';
import { CustomersModule } from '../customers/customers.module';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordTokenService,
    ForgotPasswordNotification,
    ResetPasswordNotification,
  ],
  imports: [
    forwardRef(() => UsersModule),
    CustomersModule,
    TypeOrmModule.forFeature([PasswordToken]),
  ],
  exports: [AuthService],
})
export class AuthModule {}
