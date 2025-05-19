import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Product } from './product.entity';
import { Attribute } from './attribute.entity';
import { AttributeValue } from './attribute-value.entity';

@Entity('products_attribute_values')
//PascalCase
export class ProductAttributeValue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (item) => item.attributeValues)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Attribute, (item) => item.productAttributeValues)
  @JoinColumn({ name: 'attribute_id' })
  attribute: Attribute;

  @ManyToOne(() => AttributeValue, (item) => item.productAttributeValues)
  @JoinColumn({ name: 'attribute_value_id' })
  attributeValue: AttributeValue;

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
