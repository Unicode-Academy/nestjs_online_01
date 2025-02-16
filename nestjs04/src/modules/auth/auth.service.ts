import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { comparePassword } from 'src/utils/hashing';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async checkAuth(email: string, password: string) {
    //Kiểm tra email có tồn tại hay không?
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (user) {
      const passwordHash = user.password;
      if (comparePassword(password, passwordHash)) {
        return this.createToken(user);
      }
    }
    return false;
  }

  async getUser(token: string) {
    const payload = this.decodeToken(token);
    if (!payload) return false;
    return this.userRepository.findOne({ where: { id: payload.sub } });
  }

  createToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }
}
