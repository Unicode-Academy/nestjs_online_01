import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { VariantImage } from './variant_image.entity';
import { VariantAttributeValue } from './variant_attribute_value.entity';

@Entity('variants')
export class Variant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(() => VariantImage, (variantImage) => variantImage.variant)
  variantImages: VariantImage[];

  @OneToMany(() => VariantAttributeValue, (item) => item.variant)
  variantAttributeValues: VariantAttributeValue[];

  @Column()
  thumbnail: string;

  @Column()
  price: number;

  @Column()
  sale_price: number;

  @Column()
  content: string;

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
