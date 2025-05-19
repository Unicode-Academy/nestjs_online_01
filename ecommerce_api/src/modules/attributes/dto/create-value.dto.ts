import { Exclude, Expose, Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

@Exclude()
export default class CreateValueDto {
  @Expose()
  @IsNotEmpty({ message: 'Giá trị bắt buộc phải nhập' })
  value: string;

  @Expose()
  @IsNotEmpty({ message: 'Nhãn bắt buộc phải nhập' })
  label: string;
}
