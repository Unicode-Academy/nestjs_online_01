import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async validateUser(email: string, password: string) {
    //Kiểm tra email có tồn tại hay không?
    //So sánh hash password với plain password được gửi lên từ request
    const user = {
      id: 1,
      name: 'Hoàng An Unicode',
      email: 'hoangan.web@gmail.com',
    };
    if (email === 'hoangan.web@gmail.com' && password === '123456') {
      return user;
    }
    return false;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginGoogle(googleUser: any) {
    const user = {
      id: 1,
      name: 'Hoàng An Unicode',
      email: 'hoangan.web@gmail.com',
    };
    return user;
  }
}
