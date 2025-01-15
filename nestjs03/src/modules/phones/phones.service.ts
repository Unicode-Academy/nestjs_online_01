import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Phone } from '../users/entites/phone.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entites/user.entity';

@Injectable()
export class PhonesService {
  constructor(
    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,
  ) {}
  create(phone: any, user: any) {
    if (user) {
      phone.user = user;
    }
    const newPhone = this.phoneRepository.create(phone);
    return this.phoneRepository.save(newPhone);
  }
}
