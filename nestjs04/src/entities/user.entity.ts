import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Phone } from './phone.entity';

@Entity('users')
//PascalCase
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  status: boolean;

  @OneToOne(() => Phone, (phone) => phone.user)
  phone: Phone;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  verify_at: Date;

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
