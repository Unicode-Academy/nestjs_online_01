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
import { QueryFindAll } from './users.controller';
import { PhonesService } from '../phones/phones.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly phoneService: PhonesService,
  ) {}
  findAll(query: QueryFindAll) {
    const { _order, _sort, _limit = 10, _page = 1, q } = query;
    const skip = (_page - 1) * _limit;
    const where = [];
    if (q) {
      where.push(
        {
          name: Like(`%${q}%`),
        },
        {
          email: Like(`%${q}%`),
        },
      );
    }
    return this.usersRepository.findAndCount({
      order: {
        [_sort]: _order,
      },
      take: _limit,
      skip,
      where,
      relations: {
        phone: true,
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
      // where: {
      //   // email: Not('hoangan.web@gmail.com'),
      //   // id: Equal(7),
      //   // email: ILike('%hoangan%'),
      //   // bio: Not(IsNull()),
      //   // id: Raw('MAX(id)'),
      //   email: Or(Like('%user1%'), Like('%hoangan%')),
      // },
      // take: 2,
      // skip: 2,
      // where: [
      //   {
      //     name: Like('%hoangan%'),
      //   },
      //   {
      //     email: Like('%hoangan%'),
      //   },
      // ],
    });
  }
  //Giả sử: WHERE (name LIKE '%hoangan%' OR email LIKE '%hoangan%') AND status = true
  findOne(id: number) {
    return this.usersRepository.findOneOrFail({
      where: { id },
      relations: {
        phone: true,
      },
    });
  }

  async create(body: Partial<User & { phone: string }>) {
    const { phone, ...userData } = body;
    const newUser = this.usersRepository.create(userData);
    newUser.password = hashPassword(newUser.password);
    const user = await this.usersRepository.save(newUser);
    const data = await this.phoneService.create({ phone }, user);
    console.log(data);
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
  async deleteMany(ids: number[]) {
    const data = await this.usersRepository.delete({
      id: In(ids),
    });
    return data.affected;
  }
}

//Bài tập: Viết API sau

//DELETE /users
//Body: [1,2,3]
//Chức năng: Xóa nhiều users theo id gửi lên

//Xây dựng api sau

//GET /users
// 1. Sort
// _sort=name&_order=desc

// 2. Filter
// q=abc

//3. Paginate (Phải trả về thêm thông tin tất cả bản ghi)
// _limit=2&_page=1
