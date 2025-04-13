import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PasswordTokenService } from './password-token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordToken } from 'src/entities/password_token.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PasswordTokenService],
  imports: [UsersModule, TypeOrmModule.forFeature([PasswordToken])],
})
export class AuthModule {}
