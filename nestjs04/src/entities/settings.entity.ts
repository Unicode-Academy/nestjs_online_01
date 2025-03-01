import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Phone } from './phone.entity';

@Entity('settings')
//PascalCase
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  opt_key: string;

  @Column()
  opt_value: string;

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
