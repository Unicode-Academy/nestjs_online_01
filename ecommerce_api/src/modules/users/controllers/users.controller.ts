import { Controller, Get } from '@nestjs/common';
import { VERSION } from 'src/constants/version';

@Controller({
  path: 'users',
  version: VERSION.V1,
})
export class UsersController {
  @Get()
  findAll() {
    return 'user client';
  }
}
