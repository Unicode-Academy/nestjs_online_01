import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entites/user.entity';
import { Post } from './modules/users/entites/post.entity';
import { Phone } from './modules/users/entites/phone.entity';
import { PhonesModule } from './modules/phones/phones.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql', //driver
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Post, Phone],
      synchronize:
        process.env.NODE_ENV === 'development' || !process.env.NODE_ENV, //Tự động đồng bộ với database khi có sự thay đổi từ entity (Chỉ nên để ở môi trường dev)
      logging: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV,
    }),
    UsersModule,
    PhonesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
