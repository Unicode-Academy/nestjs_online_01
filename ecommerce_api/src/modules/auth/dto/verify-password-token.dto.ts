import { IsNotEmpty } from 'class-validator';

export default class VerifyPasswordToken {
  @IsNotEmpty({ message: 'Token không được bỏ trống' })
  token: string;
}
