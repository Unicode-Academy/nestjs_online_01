import { IsIn, IsOptional } from 'class-validator';

export default class UpdateBrandDto {
  name: string;
  slug: string;
  parent_id: number;
  @IsOptional()
  @IsIn(['active', 'inactive'], {
    message: 'Trạng thái không hợp lệ',
  })
  status: string;
}
