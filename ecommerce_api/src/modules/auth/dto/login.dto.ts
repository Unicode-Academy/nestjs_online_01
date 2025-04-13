import { IsEmail, IsNotEmpty } from 'class-validator';

export default class LoginDto {
  @IsNotEmpty({ message: 'Email không được bỏ trống' })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được bỏ trống' })
  password: string;
}
