import { IsEmail, IsNotEmpty } from 'class-validator';

export default class ForgotPasswordDto {
  @IsNotEmpty({ message: 'Email không được bỏ trống' })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email: string;
}
