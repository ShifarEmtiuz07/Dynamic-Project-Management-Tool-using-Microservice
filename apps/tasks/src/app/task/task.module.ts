import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../../../../libs/shared-entities/src/lib/user.entity';
import { TaskEntity } from '../../../../../libs/shared-entities/src/lib/task.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationPublisherService } from './notificationPublisher.service';
  import { NOTIFICATION_SERVICE } from './constants';

@Module({
  imports: [    

  ClientsModule.register([
      {
        name: NOTIFICATION_SERVICE,
        transport: Transport.RMQ,
        options: {
          //urls: ['amqp://localhost:5672'],
          urls: ['amqp://rabbitmq:5672'],
          queue: 'notification_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([TaskEntity,UserEntity])],
  controllers: [TaskController],
  providers: [TaskService,NotificationPublisherService],
   exports: [NotificationPublisherService],
})
export class TaskModule {}
