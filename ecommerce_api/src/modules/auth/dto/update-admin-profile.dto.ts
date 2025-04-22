import { IsEmail, IsNotEmpty } from 'class-validator';

export default class UpdateAdminProfileDto {
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
}
