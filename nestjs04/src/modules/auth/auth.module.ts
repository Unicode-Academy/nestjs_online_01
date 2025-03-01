import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { SocialLoginController } from './social.controller';
import { SettingsModule } from '../settings/settings.module';
import WelcomeEmail from 'src/mail/Welcome';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE_NAME } from 'src/constants/queue';

@Module({
  controllers: [AuthController, SocialLoginController],
  providers: [AuthService, WelcomeEmail],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRED },
    }),
    RedisModule.forRoot({
      type: 'single',
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    }),
    SettingsModule,
    BullModule.registerQueue({
      name: QUEUE_NAME.EMAIL,
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
