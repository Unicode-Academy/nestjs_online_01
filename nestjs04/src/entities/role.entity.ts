import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Permission } from './permission.entity';

@Entity('roles')
//PascalCase
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: boolean;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'role_id',
    },
    inverseJoinColumn: {
      name: 'user_id',
    },
  })
  users: User[];

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: {
      name: 'role_id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
    },
  })
  permissions: Permission[];

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
