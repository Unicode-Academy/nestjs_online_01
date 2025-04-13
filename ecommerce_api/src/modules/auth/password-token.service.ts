import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordToken } from 'src/entities/password_token.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import * as moment from 'moment-timezone';
@Injectable()
export class PasswordTokenService {
  constructor(
    @InjectRepository(PasswordToken)
    private readonly passwordTokenRepository: Repository<PasswordToken>,
  ) {}

  async create(data: any) {
    return this.passwordTokenRepository.save(data);
  }

  async verify(token: string) {
    console.log(new Date());

    const data = await this.passwordTokenRepository.findOne({
      where: {
        token,
        expire_at: MoreThanOrEqual(moment().format('YYYY-MM-DD HH:mm:ss')),
      },
    });
    return data;
  }
}
