import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entites/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  findAll() {
    return this.usersRepository.find({
      select: {
        // id: true,
        // name: true,
        // email: true,
      },
      order: {
        id: 'DESC',
      },
    });
  }
  findOne(id: number) {
    // return this.usersRepository.findOne({
    //   where: {
    //     id,
    //   },
    // });
    return this.usersRepository.findOneOrFail({
      where: { id },
    });
  }

  create(user: Partial<User>) {
    const newUser = this.usersRepository.create(user);
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
