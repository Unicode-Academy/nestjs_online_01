import { Logger, UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebsocketGuard } from 'src/guards/websocket/websocket.guard';

@WebSocketGateway(8080, {
  cors: {
    origin: '*',
  },
  namespace: 'chat',
})
@UseGuards(WebsocketGuard)
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('AppGateway');
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    // this.logger.log('WebSocket initialized');
    console.log('Khởi tạo server');
  }
  handleConnection(client: Socket) {
    // this.logger.log(`Client connected: ${client.id}`);
    console.log('Client kết nối', client.id);
  }

  handleDisconnect(client: any) {
    // this.logger.log(`Client disconnected: ${client.id}`);
    console.log(`Client ngắt kết nối: ${client.id}`);
  }

  @SubscribeMessage('send-message')
  handleMessage(client: any, payload: string) {
    // this.server.emit('message', payload);
    console.log(`Tin nhắn từ client gửi lên: `, payload);
    this.server.emit('new-message', payload);
  }

  @SubscribeMessage('send-message2')
  handleMessage2(client: any, payload: string) {
    console.log('Tin nhắn từ client gửi lên 2: ', payload);

    this.server.emit('new-message', payload);
  }
}

//ws//localhost:8080
