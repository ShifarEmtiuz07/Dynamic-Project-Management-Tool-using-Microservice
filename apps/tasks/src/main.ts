/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TASK_PACKAGE_NAME } from 'types/proto/task';
import path, { join } from 'path';

async function bootstrap() {
 const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: TASK_PACKAGE_NAME,
        protoPath: join(__dirname, 'proto/task.proto'),
         url: 'task-service:5003', // 'localhost:5003' for local testing
      //   loader: {
      //   includeDirs: [
      //     path.resolve(__dirname, 'proto'),
      //     path.resolve(__dirname, '../../node_modules/google-proto-files'),
      //   ],
      // },
        
      },
    }
  );
  await app.listen();
  Logger.log(' Task Application is running on gRPC channel');
}

bootstrap();
