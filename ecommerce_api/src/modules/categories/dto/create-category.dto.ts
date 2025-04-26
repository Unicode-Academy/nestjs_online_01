import { IsIn, IsNotEmpty } from 'class-validator';
import { isUnique } from 'src/common/validation/UniqueConstraint';

export default class CreateCategoryDto {
  @IsNotEmpty({ message: 'Tên bắt buộc phải nhập' })
  name: string;
  @isUnique(
    {
      tableName: 'categories',
      column: 'slug',
    },
    {
      message: 'Slug đã tồn tại',
    },
  )
  slug: string;
  parent_id: number;
  @IsIn(['active', 'inactive'], {
    message: 'Trạng thái không hợp lệ',
  })
  status: string;
  description?: string;
  image?: string;
}
