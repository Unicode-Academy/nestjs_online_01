import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll() {
    //Call ORM: SELECT * FROM users
  }
}
