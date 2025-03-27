import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OnEvent } from '@nestjs/event-emitter';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  create(@Body() body: any) {
    return this.orderService.create(body);
  }
  @Get('thank-you')
  @OnEvent('order.created')
  success() {
    console.log('Thành công');

    return 'Thành công';
  }

  @Get('test-1')
  test() {
    return {
      value: 'ok chưa 1?',
    };
  }
}
