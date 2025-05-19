import { Exclude, Expose, Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { isUnique } from 'src/common/validation/UniqueConstraint';

@Exclude()
export default class CreateAttributeDto {
  @Expose()
  @IsNotEmpty({ message: 'Tên bắt buộc phải nhập' })
  name: string;

  @Expose()
  @IsIn(['text', 'image', 'color'], {
    message: 'Loại thuộc tính không hợp lệ',
  })
  type: string;

  @Expose()
  @IsIn(['inactive', 'active'], {
    message: 'Trạng thái thuộc tính không hợp lệ',
  })
  status: string;
}
