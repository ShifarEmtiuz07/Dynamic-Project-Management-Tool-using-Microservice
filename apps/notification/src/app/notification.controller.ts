import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationGateway } from './notification.gateway';

@Controller()
export class NotificationController {
     constructor(private gateway: NotificationGateway) {}
  @EventPattern('task_notification')
  handleTaskStatusUpdate(@Payload() data: any) {
    const { userId, message  } = data;
  
    // Send the message via WebSocket
    this.gateway.sendNotification(userId, message);
  }
}
