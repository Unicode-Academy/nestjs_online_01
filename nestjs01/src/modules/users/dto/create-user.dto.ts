import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { Unique } from 'src/rules/unique.rule';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Tên bắt buộc phải nhập' })
  @IsString({ message: 'Tên phải là ký tự' })
  name: string;

  @IsNotEmpty({ message: 'Email bắt buộc phải nhập' })
  @IsString({ message: 'Email phải là ký tự' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @Validate(Unique, { message: 'Email đã tồn tại' })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu bắt buộc phải nhập' })
  @IsString({ message: 'Mật khẩu phải là ký tự' })
  @MinLength(6, { message: 'Mật khẩu phải từ 6 ký tự' })
  password: string;
}
