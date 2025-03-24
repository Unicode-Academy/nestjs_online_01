import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080, {
  cors: {
    origin: '*',
  },
  namespace: 'notification',
})
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  private db = {};
  afterInit(server: Server) {
    // this.logger.log('WebSocket initialized');
    console.log('Khởi tạo server notification');
  }
  handleConnection(client: Socket) {
    // this.logger.log(`Client connected: ${client.id}`);
    console.log('Client kết nối notification', client.id);
    const user = client.handshake.headers['x-user'];
    this.db[user as string] = client.id;
  }

  handleDisconnect(client: any) {
    // this.logger.log(`Client disconnected: ${client.id}`);
    console.log(`Client ngắt kết nối notification: ${client.id}`);
  }

  @SubscribeMessage('send-notification')
  handleSendNotification(client: any, payload: any) {
    this.server.emit('new-notification', payload);
  }

  @SubscribeMessage('private-notification')
  handlePrivateNotification(client: any, payload: any) {
    // const targetUser = this.db['user3'];
    // this.server.to(targetUser).emit('new-notification', payload);
    // this.server.to(client.id).emit('new-notification', payload);
    // client.emit('new-notification', payload);
    this.server.to('room1').emit('new-notification', payload);
  }

  @SubscribeMessage('join')
  handleJoinRoom(client: any) {
    client.join('room1');
    client.emit('join-message', 'Đã join thành công');
  }
}

//ws//localhost:8080
