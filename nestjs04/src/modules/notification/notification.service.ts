import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { getDelay } from 'src/utils/utils';

@Injectable()
export class NotificationService {
  @OnEvent('order.created')
  async sendToUserNotificationOrder(orderId: number) {
    await getDelay(10000);
    console.log(`Gửi thông báo cho user khi có đơn hàng mới: ${orderId}`);
  }
  @OnEvent('order.created')
  sendToAdminNotificationOrder(orderId: number) {
    console.log(`Gửi thông báo cho admin khi có đơn hàng mới: ${orderId}`);
  }
}
