import { Module } from '@nestjs/common';
import { CommissionService } from './commission.service';

@Module({
  providers: [CommissionService]
})
export class CommissionModule {}
