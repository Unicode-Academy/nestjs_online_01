import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ActiveToken } from './active_token.entity';
import { PasswordToken } from './password_token.entity';
import { Customer } from './customer.entity';

@Entity('users')
//PascalCase
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  status: string;

  @Column()
  user_type: string;

  @Column()
  verify_at: Date;

  @OneToMany(() => ActiveToken, (token) => token.user)
  activeToken: ActiveToken[];

  @OneToMany(() => PasswordToken, (token) => token.user)
  passwordToken: PasswordToken[];

  @OneToOne(() => Customer, (customer) => customer.user)
  customer: Customer;

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
