import { Exclude, Expose, Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { isUnique } from 'src/common/validation/UniqueConstraint';

@Exclude()
export default class CreateProductDto {
  @IsNotEmpty({ message: 'Tên bắt buộc phải nhập' })
  @Expose()
  name: string;
  @isUnique(
    {
      tableName: 'products',
      column: 'slug',
    },
    {
      message: 'Slug đã tồn tại',
    },
  )
  @Expose()
  slug: string;
  @IsNotEmpty({ message: 'Mã sản phẩm bắt buộc phải nhập' })
  @isUnique(
    {
      tableName: 'products',
      column: 'sku',
    },
    {
      message: 'Mã sản phẩm đã tồn tại',
    },
  )
  @Expose()
  sku: string;

  @IsNotEmpty({ message: 'Hình ảnh bắt buộc phải nhập' })
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

  @IsNotEmpty({ message: 'Mô tả bắt buộc phải nhập' })
  @Expose()
  content: string;

  @IsIn(['simple', 'variant'], {
    message: 'Kiểu sản phẩm không hợp lệ',
  })
  @Expose()
  type: string;
  @IsIn(['active', 'inactive'], {
    message: 'Trạng thái không hợp lệ',
  })
  @Expose()
  status: string;

  @Expose()
  brand_id: number;

  @Expose()
  @IsArray({ message: 'Chuyên mục không hợp lệ' })
  @ArrayMinSize(1, {
    message: 'Chuyên mục phải nhất 1',
  })
  category: number[];

  @Expose()
  @IsOptional()
  @IsArray({ message: 'Ảnh không hợp lệ' })
  images: string[];
}
