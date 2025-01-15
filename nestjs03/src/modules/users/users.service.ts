import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  Equal,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Or,
  Raw,
  Repository,
} from 'typeorm';
import { User } from './entites/user.entity';
import { hashPassword } from 'src/utils/hashing';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  findAll() {
    return this.usersRepository.find({
      order: {
        id: 'DESC',
      },
      // where: [
      //   {
      //     id: 7,
      //     email: 'user1@gmail.com',
      //   },
      //   {
      //     status: true,
      //     name: 'Hoàng An',
      //   },
      // ],
      where: {
        // email: Not('hoangan.web@gmail.com'),
        // id: Equal(7),
        // email: ILike('%hoangan%'),
        // bio: Not(IsNull()),
        // id: Raw('MAX(id)'),
        email: Or(Like('%user1%'), Like('%hoangan%')),
      },
      // take: 2,
      // skip: 2,
    });
  }
  //Giả sử: WHERE name LIKE '%hoangan%' OR email LIKE '%hoangan%'
  findOne(id: number) {
    return this.usersRepository.findOneOrFail({
      where: { id },
    });
  }

  create(user: Partial<User>) {
    const newUser = this.usersRepository.create(user);
    newUser.password = hashPassword(newUser.password);
    return this.usersRepository.save(newUser);
  }

  async update(id: number, user: Partial<User>) {
    await this.usersRepository.update(id, user);
    return this.findOne(id);
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.delete(id);
    return user;
  }
}
