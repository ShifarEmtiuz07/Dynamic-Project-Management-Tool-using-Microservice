import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../../../../libs/shared-entities/src/lib/user.entity';
import { TaskEntity } from '../../../../../libs/shared-entities/src/lib/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity,UserEntity]),],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
