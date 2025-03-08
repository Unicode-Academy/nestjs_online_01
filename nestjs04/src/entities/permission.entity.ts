import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from './role.entity';

@Entity('permissions')
//PascalCase
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: boolean;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: {
      name: 'permission_id',
    },
    inverseJoinColumn: {
      name: 'role_id',
    },
  })
  roles: Role[];

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
