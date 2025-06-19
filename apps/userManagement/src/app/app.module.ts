import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
 import { DatabaseModule } from './../../../../libs/common/src/Database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// Update the path below to the correct relative path where user.entity actually exists
import { UserEntity } from './../../../../libs/shared-entities/src/lib/user.entity';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TaskEntity } from 'libs/shared-entities/src/lib/task.entity';
import { RedisCacheModule } from 'libs/common/src/redis/redis.module';

 

@Module({
  imports: [RedisCacheModule,DatabaseModule,UserModule,TypeOrmModule.forFeature([UserEntity,TaskEntity]),
],


controllers: [AppController,UserController],
  providers: [AppService,UserService],
})
export class AppModule {}
