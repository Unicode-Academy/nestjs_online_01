import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { AdminBrandsController } from './admin.brands.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'src/entities/brand.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { multerConfig } from 'src/config/multer';

@Module({
  controllers: [BrandsController, AdminBrandsController],
  providers: [BrandsService],
  exports: [BrandsService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Brand]),
    MulterModule.register({
      storage: multerConfig.storage,
      fileFilter: multerConfig.fileFilter,
    }),
  ],
})
export class BrandsModule {}
