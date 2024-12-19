import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll() {
    return 'ahihi';
  }
  findOne(id: string) {
    return 'detail - ' + id;
  }
  filters(query: any) {
    return query;
  }
  create(userData: any) {
    return userData;
  }
  update(id: string, userData: any) {
    return {
      id,
      data: userData,
    };
  }
  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
