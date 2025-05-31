import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Variant } from './variant.entity';
import { AttributeValue } from './attribute-value.entity';

@Entity('variants_attribute_value')
export class VariantAttributeValue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Variant, (variant) => variant.variantAttributeValues)
  @JoinColumn({ name: 'variant_id' })
  variant: Variant;

  @ManyToOne(() => AttributeValue, (attributeValue) => attributeValue)
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
