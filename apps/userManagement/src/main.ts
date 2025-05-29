import { USER_PACKAGE_NAME } from './../../../types/proto/user';
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: USER_PACKAGE_NAME,
        protoPath: join(__dirname, 'proto/user.proto'),
         url: 'localhost:5002',
      },
    }
  );
  await app.listen();
  Logger.log(' User Application is running on gRPC channel');
}


bootstrap();
