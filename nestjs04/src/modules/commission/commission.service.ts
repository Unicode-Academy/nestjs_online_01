import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CommissionService {
  @OnEvent('order.created')
  calcCommission(orderId: number) {
    console.log(`Tính toán commission cho ${orderId}`);
  }
}
