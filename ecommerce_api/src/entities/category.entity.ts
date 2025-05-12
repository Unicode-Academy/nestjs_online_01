import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('categories')
//PascalCase
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Category, (category) => category.parent)
  @JoinColumn({ name: 'parent_id' })
  children: Category[];

  @ManyToOne(() => Category, (category) => category.children)
  @JoinColumn({ name: 'parent_id' })
  parent: Category;

  @Column()
  parent_id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  status: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];

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
