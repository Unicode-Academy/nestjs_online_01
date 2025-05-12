import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
export const multerConfig = {
  storage: diskStorage({
    destination: './storage', // Directory where files will be stored
    filename: (req, file, callback) => {
      const fileExt = extname(file.originalname);
      const fileName = `${uuid()}.${fileExt}`;
      callback(null, fileName);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(
        new BadRequestException('Only image files are allowed!'),
        false,
      );
    }
    callback(null, true);
  },
};

export const getStorage = (folder: string) => {
  return diskStorage({
    destination: './storage/' + folder, // Directory where files will be stored
    filename: (req, file, callback) => {
      const fileExt = extname(file.originalname);
      const fileName = `${uuid()}${fileExt}`;
      callback(null, fileName);
    },
  });
};
