import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  ValidateIf,
  IsIn,
} from 'class-validator';
export default class CreateUserDto {
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

  @IsIn(['active', 'inactive'], {
    message: 'Trạng thái không hợp lệ',
  })
  status: string;

  user_type?: string;
  verify_at?: Date;
}
