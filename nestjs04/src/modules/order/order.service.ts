import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class OrderService {
  constructor(private eventEmitter: EventEmitter2) {}
  async create(body: any) {
    //Gửi email cho khách
    //Gửi thông báo cho admin
    //Gửi thông báo đại lý
    //Tính tiền hoa hồng
    await this.eventEmitter.emitAsync('order.created', 1);
    return body;
  }
}
