import { IsNotEmpty } from 'class-validator';

export default class RefreshTokenDto {
  @IsNotEmpty({ message: 'Refresh token không được bỏ trống' })
  refresh_token: string;
}
