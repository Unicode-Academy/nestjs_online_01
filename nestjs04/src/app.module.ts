import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Category } from './entities/category.entity';
import { PostsModule } from './modules/posts/posts.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { UsersModule } from './modules/users/users.module';
import typeorm from './config/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { SettingsModule } from './modules/settings/settings.module';
import * as path from 'path';
import { BullModule } from '@nestjs/bullmq';
import { EmailConsumer } from './consumer/EmailConsumer';
import { RolesModule } from './modules/roles/roles.module';
import WelcomeEmail from './mail/Welcome';
import mail from './config/mail';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OrderModule } from './modules/order/order.module';
import { CommissionModule } from './modules/commission/commission.module';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm, mail],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('mail'),
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
    }),
    EventEmitterModule.forRoot(),

    PostsModule,
    CategoriesModule,
    UsersModule,
    AuthModule,
    SettingsModule,
    RolesModule,
    OrderModule,
    CommissionModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailConsumer, WelcomeEmail],
})
export class AppModule {}
