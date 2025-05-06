import { IsIn, IsNotEmpty } from 'class-validator';
import { isUnique } from 'src/common/validation/UniqueConstraint';

export default class CreateBrandDto {
  @IsNotEmpty({ message: 'Tên bắt buộc phải nhập' })
  name: string;
  @isUnique(
    {
      tableName: 'brands',
      column: 'slug',
    },
    {
      message: 'Slug đã tồn tại',
    },
  )
  slug: string;

  @IsIn(['active', 'inactive'], {
    message: 'Trạng thái không hợp lệ',
  })
  status: string;
}
