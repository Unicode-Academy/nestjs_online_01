import { Injectable } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../config/multer';

@Injectable()
export class FileUploadInterceptor extends FileInterceptor('image', {
  storage: multerConfig.storage,
  fileFilter: multerConfig.fileFilter,
  limits: { fileSize: 1024 * 1024 }, // Limit file size to 1MB
}) {}
