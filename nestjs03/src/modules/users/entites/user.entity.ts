import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Phone } from './phone.entity';
import { Post } from './post.entity';

@Entity('users')
//PascalCase
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    length: 100,
  })
  password: string;

  @Column({
    default: true,
  })
  status: boolean;

  @Column({
    type: 'text',
    nullable: true,
  })
  bio: string;

  @OneToOne(() => Phone, (phone) => phone.user)
  phone: Phone;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

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
