import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthServiceModule } from './auth-service/auth-service.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'libs/shared-entities/src/lib/user.entity';
import { DatabaseModule } from 'libs/common/src/Database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),DatabaseModule,AuthServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
