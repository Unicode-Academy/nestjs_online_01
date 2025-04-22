import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export default class RegisterDto {
  @IsNotEmpty({
    message: 'Vui lòng nhập tên',
  })
  name: string;
  @IsNotEmpty({
    message: 'Vui lòng nhập email',
  })
  @IsEmail(
    {},
    {
      message: 'Email không đúng định dạng',
    },
  )
  email: string;
  @MinLength(6, {
    message: 'Mật khẩu phải từ 6 ký tự',
  })
  password: string;
  @IsNotEmpty({
    message: 'Vui lòng nhập số điện thoại',
  })
  phone: string;

  status?: string;
}
