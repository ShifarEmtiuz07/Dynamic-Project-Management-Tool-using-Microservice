import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './../../../../libs/common/src/Database/database.module';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../../../../libs/shared-entities/src/lib/task.entity';
import { UserEntity } from '../../../../libs/shared-entities/src/lib/user.entity';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';

@Module({
  imports: [

DatabaseModule,
    TaskModule,
    TypeOrmModule.forFeature([TaskEntity,UserEntity]),
  ],
  controllers: [AppController,TaskController],
  providers: [AppService,TaskService],
})
export class AppModule {}
