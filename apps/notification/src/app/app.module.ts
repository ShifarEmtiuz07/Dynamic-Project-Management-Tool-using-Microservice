import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationController } from './notification.controller';
import { NotificationGateway } from './notification.gateway';

@Module({
  imports: [],
  controllers: [AppController,NotificationController],
  providers: [AppService,NotificationGateway],
})
export class AppModule {}
