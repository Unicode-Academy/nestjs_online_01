import { IsNotEmpty } from 'class-validator';

export default class ChangePasswordDto {
  @IsNotEmpty({ message: 'Vui lòng nhập mật khẩu cũ' })
  old_password: string;
  @IsNotEmpty({ message: 'Vui lòng nhập mật khẩu mới' })
  password: string;
}
