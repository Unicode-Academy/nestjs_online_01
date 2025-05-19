import { Exclude, Expose, Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

@Exclude()
export default class UpdateValueDto {
  @Expose()
  value: string;

  @Expose()
  label: string;
}
