import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';
import { ProductImage } from './product-image.entity';
import { ProductAttributeValue } from './product-attribute-value.entity';
import { Variant } from './variant.entity';
import { VariantImage } from './variant_image.entity';

@Entity('products')
//PascalCase
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sku: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  thumbnail: string;

  @Column()
  price: number;

  @Column()
  sale_price: number;

  @Column()
  content: string;

  @Column({
    name: 'rating_ammount',
  })
  rating: number;

  @Column()
  type: string;

  @Column()
  status: string;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @OneToMany(() => VariantImage, (variantImage) => variantImage.product)
  variantImages: VariantImage[];

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'products_categories',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];

  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];

  @OneToMany(() => ProductAttributeValue, (value) => value.product)
  attributeValues: ProductAttributeValue[];

  @OneToMany(() => Variant, (variant) => variant.product)
  variants: Variant[];

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP', //Khi update bản ghi tự động update field này
  })
  updated_at: Date;
}
