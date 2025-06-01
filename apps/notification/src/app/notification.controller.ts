import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationGateway } from './notification.gateway';

@Controller()
export class NotificationController {
     constructor(private gateway: NotificationGateway) {}
  @EventPattern('task_notification')
  handleTaskStatusUpdate(@Payload() data: any) {
    console.log('Received task status update:', data);
    // Handle the task status update
    console.log(' Task status update received:', data);
    // You can push via WebSocket or store to DB
    const { userId, message  } = data;
    const neMmessage = `A new task "${message}" has been created!`;

    // Send the message via WebSocket
    this.gateway.sendNotification(userId, neMmessage);
  }
}
