import {
  Controller,
  Headers,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post()
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, callback) => {
  //         const newName = uuid();
  //         const ext = file.originalname.split('.').pop();
  //         const filename = `${newName}.${ext}`;
  //         const allowed = ['image/png', 'image/jpg', 'image/jpeg'];
  //         if (!allowed.includes(file.mimetype)) {
  //           return callback(
  //             new HttpException(
  //               'File không đúng định dạng',
  //               HttpStatus.BAD_REQUEST,
  //             ),
  //             null,
  //           );
  //         }
  //         callback(null, filename);
  //       },
  //     }),
  //   }),
  // )
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 10 }]))
  uploadFile(@UploadedFiles() file: Express.Multer.File, @Req() request: any) {
    console.log(file);

    // const origin = `${request.protocol}://${request.get('host')}`;
    // return {
    //   message: 'Upload file thành công',
    //   data: {
    //     filename: file.filename,
    //     fileUrl: origin + '/storage/' + file.filename,
    //   },
    // };
  }
}

/*
Buổi sau: 
- Hướng dẫn nốt phần upload file (Multiples Upload, Validate Pipe)
- Database: mysql, postgres

Cài trước MariaDB và HeidiSQL
*/
