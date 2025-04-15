import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordToken } from 'src/entities/password_token.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import * as moment from 'moment-timezone';
import { UsersService } from '../users/users.service';
@Injectable()
export class PasswordTokenService {
  constructor(
    @InjectRepository(PasswordToken)
    private readonly passwordTokenRepository: Repository<PasswordToken>,
    private readonly usersService: UsersService,
  ) {}

  async create(data: any) {
    return this.passwordTokenRepository.save(data);
  }

  async verify(token: string) {
    const data = await this.passwordTokenRepository.findOne({
      where: {
        token,
        expire_at: MoreThanOrEqual(moment().format('YYYY-MM-DD HH:mm:ss')),
      },
      relations: {
        user: true,
      },
    });
    return data;
  }

  async updatePassword(password: string, token: string) {
    const isTokenValid = await this.verify(token);
    if (!isTokenValid) {
      return false;
    }
    const userId = isTokenValid.user.id;
    await this.usersService.update({ password }, userId);
    return isTokenValid.user;
  }

  async revoktoken(token: string) {
    await this.passwordTokenRepository.delete({ token });
  }
}
