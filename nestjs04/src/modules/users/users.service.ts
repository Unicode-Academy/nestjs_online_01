import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly roleService: RolesService,
  ) {}
  findAll() {
    // return this.usersRepository.find();
    // return (
    //   this.usersRepository
    //     .createQueryBuilder('users')
    //     .select(['users.id', 'users.fullname ', 'users.email'])
    //     .leftJoinAndSelect('users.phone', 'phones')
    //     .orderBy('users.id', 'DESC')
    //     .where('users.id >= :id', { id: 42 })
    //     .where('users.id <= :id', { id: 50 })
    //     // .limit(10)
    //     .getMany()
    // );
    return this.usersRepository.query(
      `SELECT users.*, phones.phone FROM users LEFT JOIN phones ON users.id = phones.user_id`,
    );
  }

  create(userData: any) {
    return this.usersRepository.save(userData);
  }

  async assignRoles(user: User, roles: number[]) {
    const roleList = await Promise.all(
      roles.map((roleId: number) => this.roleService.find(roleId)),
    );
    if (roleList) {
      user.roles = roleList;
      this.usersRepository.save(user);
    }
    return user;
  }

  async find(userId: number) {
    return this.usersRepository.findOne({ where: { id: userId } });
  }

  async roles(userId: number) {
    const user = this.usersRepository.findOne({
      where: { id: userId },
      relations: {
        roles: {
          permissions: true,
        },
      },
    });
    return user;
  }
}
