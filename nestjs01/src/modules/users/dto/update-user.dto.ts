import { IsEmail, IsNotEmpty } from 'class-validator';
// import { Unique } from 'src/rules/unique.rule';

export class UpdateUserDto {
  name: string;
  @IsNotEmpty({ message: 'Email bắt buộc phải nhập' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  //   @Validate(Unique, { message: 'Email đã tồn tại' })
  email: string;
  password: string;
}
