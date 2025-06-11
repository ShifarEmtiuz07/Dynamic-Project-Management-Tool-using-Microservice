import { Module } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { AuthController } from './auth-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'libs/shared-entities/src/lib/user.entity';
import { JwtModule } from '@nestjs/jwt';
     import { ConfigModule, ConfigService } from '@nestjs/config';
     import { HttpModule } from '@nestjs/axios';
    

@Module({
  imports: [ TypeOrmModule.forFeature([UserEntity]),
  
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot()],
 

useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    HttpModule,],

  controllers: [AuthController],
  providers: [AuthServiceService],
  exports: [JwtModule],
})
export class AuthServiceModule {}
