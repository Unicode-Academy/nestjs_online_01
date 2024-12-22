import { Injectable, Scope } from '@nestjs/common';
import DatabaseService from 'src/db/database.service';
import * as db from 'src/db/data.json';

@Injectable({ scope: Scope.DEFAULT })
export class UsersService {
  constructor(private readonly dbService: DatabaseService) {
    console.log('user service created');
  }
  findAll() {
    return this.dbService.query();
  }
  findOne(id: string) {
    return db.find((user) => user.id === +id);
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
