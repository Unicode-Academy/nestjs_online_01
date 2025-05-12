import { Exclude, Expose, Transform } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';

@Exclude()
export default class UpdateProductDto {
  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose()
  sku: string;

  @Expose()
  thumbnail: string;

  @Transform(({ value }) => {
    return +value;
  })
  @Expose()
  price: number = 0;

  @Transform(({ value }) => {
    return +value;
  })
  @Expose()
  sale_price: number = 0;

  @Expose()
  content: string;

  @IsOptional()
  @IsIn(['simple', 'variant'], {
    message: 'Kiểu sản phẩm không hợp lệ',
  })
  @Expose()
  type: string;

  @IsOptional()
  @IsIn(['active', 'inactive'], {
    message: 'Trạng thái không hợp lệ',
  })
  @Expose()
  status: string;

  @Expose()
  brand_id: number;
}
