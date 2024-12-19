import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    const user = {
      name: 'Hoàng An',
      email: 'hoangan.web@gmail.com',
    };
    return user;
  }
  getAbout() {
    return 'This is about page';
  }
}
