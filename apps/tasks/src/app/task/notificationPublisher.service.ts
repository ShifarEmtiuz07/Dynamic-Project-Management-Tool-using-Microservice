import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from './constants';

@Injectable()
export class NotificationPublisherService {
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly client: ClientProxy
  ) {}

  async notifyUser(userId: number, message: string) {
    console.log('Notifying  NotificationPublisherService user:', userId, 'with message:', message);
    this.client.emit('task_notification', {
      userId,
      message,
    });
  }

    async notifyAllUsers(userIds: number[], message: string) {

      console.log('Notifying users:', userIds, 'with message:', message);
    for (const id of userIds) {
      await this.notifyUser(id, message);
    }
  }
}
