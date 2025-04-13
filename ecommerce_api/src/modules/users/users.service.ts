import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import Hash from 'src/utils/hashing';
import { Brackets, Like, Not, Repository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import { APP } from 'src/constants/app';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(query: any) {
    const {
      page = 1,
      limit = APP.PER_PAGE_ADMIN,
      order = 'ASC',
      sort = 'id',
      q = '',
      status = '',
    } = query;

    const queryBuilder = this.usersRepository
      .createQueryBuilder()
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(`${sort}`, order);

    if (status === 'active' || status === 'inactive') {
      queryBuilder.andWhere('status = :status', { status });
    }

    if (q) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('name LIKE :q', { q: `%${q}%` }).orWhere('email LIKE :q', {
            q: `%${q}%`,
          });
        }),
      );
    }

    const data = await queryBuilder.getMany();
    const count = await queryBuilder.getCount();

    return [data, count];

    // return this.usersRepository.findAndCount({
    //   take: limit,
    //   skip: (page - 1) * limit,
    //   order: {
    //     [sort]: order,
    //   },
    //   where,
    // });
  }

  //SELECT * FROM users WHERE status='active' AND (name LIKE '%user1%' OR email LIKE '%user1%')

  find(value: number | string, field: string = 'id') {
    return this.usersRepository.findOne({
      where: { [field]: value },
      // select: {
      //   name: true,
      // },
    });
  }

  create(userData: CreateUserDto) {
    userData.password = Hash.make(userData.password);
    userData.user_type = 'admin';
    if (userData.status === 'active') {
      userData.verify_at = new Date();
    }
    return this.usersRepository.save(userData);
  }

  async existEmail(email: string, id: number = 0) {
    const where: {
      email?: string;
      id?: any;
    } = {
      email,
    };
    if (id) {
      where.id = Not<number>(id);
    }
    const user = await this.usersRepository.findOne({
      where,
    });
    return user;
  }

  async update(userData: UpdateUserDto, id: number) {
    if (userData.password) {
      userData.password = Hash.make(userData.password);
    }
    return this.usersRepository.update(id, userData);
  }

  async delete(id: number) {
    const user = this.find(id);
    //dispatch event
    await this.usersRepository.delete(id);
    return user;
  }
}
