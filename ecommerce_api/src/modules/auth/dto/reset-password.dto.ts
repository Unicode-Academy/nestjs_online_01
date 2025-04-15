import { IsNotEmpty } from 'class-validator';

export default class ResetPasswordDto {
  @IsNotEmpty({ message: 'Token không được bỏ trống' })
  token: string;

  @IsNotEmpty({ message: 'Mật khẩu không được bỏ trống' })
  password: string;
}
