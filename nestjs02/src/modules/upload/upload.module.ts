import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [
    ServeStaticModule.forRoot(
      {
        rootPath: process.cwd() + '/uploads',
        serveRoot: '/storage',
      },
      {
        rootPath: process.cwd() + '/public',
        serveRoot: '/assets',
      },
    ),
  ],
})
export class UploadModule {}
