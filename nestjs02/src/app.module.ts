import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [UsersModule, ProductsModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
