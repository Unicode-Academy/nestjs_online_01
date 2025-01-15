import { Module } from '@nestjs/common';
import { PhonesService } from './phones.service';
import { PhonesController } from './phones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from '../users/entites/phone.entity';

@Module({
  controllers: [PhonesController],
  providers: [PhonesService],
  exports: [PhonesService],
  imports: [TypeOrmModule.forFeature([Phone])],
})
export class PhonesModule {}
