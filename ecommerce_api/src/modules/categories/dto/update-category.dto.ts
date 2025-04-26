import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export default class UpdateCategoryDto {
  name: string;
  slug: string;
  parent_id: number;
  @IsOptional()
  @IsIn(['active', 'inactive'], {
    message: 'Trạng thái không hợp lệ',
  })
  status: string;
  description?: string;
  image?: string;
}
