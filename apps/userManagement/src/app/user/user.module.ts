import { RedisCacheModule } from './../../../../../libs/common/src/redis/redis.module';

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './../../../../../libs/shared-entities/src/lib/user.entity';
import { TaskEntity } from 'libs/shared-entities/src/lib/task.entity';



@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,TaskEntity]),RedisCacheModule], 
  controllers: [UserController],

  providers: [UserService],
})
export class UserModule {}
