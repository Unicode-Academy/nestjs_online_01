import { PartialType } from '@nestjs/mapped-types';
import UpdateAdminProfileDto from './update-admin-profile.dto';
import { IsIn, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export default class UpdateCustomerProfileDto extends PartialType(
  UpdateAdminProfileDto,
) {
  @IsNotEmpty({
    message: 'Vui lòng nhập số điện thoại',
  })
  phone: string;

  @IsIn(['male', 'female'], {
    message: 'Giới tính không hợp lệ',
  })
  @IsOptional()
  gender?: string;

  //YYY-MM-DD
  @IsOptional()
  @Matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, {
    message: 'Ngày sinh không hợp lệ',
  })
  birthday?: string;

  tax_code?: string;
}
