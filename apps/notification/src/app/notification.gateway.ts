import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Or restrict to frontend origin
  },
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  sendNotification(userId: string, message: string) {
    // Send message to the specific user
    this.server.to(userId).emit('notification', { message });
    console.log(`Notification sent to user ${userId}: ${message}`);
  }

  handleConnection(client: any) {
    const userId = client.handshake.query.userId;
    if (userId) {
      client.join(userId); // Join user to a room based on userId
    }
  }
}
