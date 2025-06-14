import { USER_PACKAGE_NAME } from './../../../../types/proto/user';
import { PRODUCTS_PACKAGE_NAME } from './../../../../types/proto/products';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import path, { join } from 'path';
import { ProductController } from './product/product.controller';
import { PROJECT_PACKAGE_NAME } from './../../../../types/proto/project';
import { ProjectController } from './project/project.controller';

import { UserManagementController } from './userManagement/user-management.controller';

import { TASK_PACKAGE_NAME } from 'types/proto/task';
import { TasksController } from './tasks/tasks.controller';

import { AuthController } from './auth/auth.controller';
import { AUTH_PACKAGE_NAME } from './../../../../types/proto/auth';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [
        JwtModule.register({
      secret: process.env.JWT_SECRET ,
    }),
          ThrottlerModule.forRoot({
      throttlers: [
        {
        ttl: 60000,
          limit: 5,
        },
      ],
    }),
    ClientsModule.register([
      {
        name: PRODUCTS_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: PRODUCTS_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/products.proto'),
          url: 'products-service:5000', // 'localhost:5000' for local testing
        },
      },

      {
        name: PROJECT_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: PROJECT_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/project.proto'),
          url: 'projects-service:5001',  // 'localhost:5001' for local testing
        },
      },

      {
        name: USER_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: USER_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/user.proto'),
          url: 'usermanagement-service:5002', // 'localhost:5002' for local testing
          loader: {
            includeDirs: [
              path.resolve(__dirname, 'proto'),
              path.resolve(__dirname, '../../node_modules/google-proto-files'),
            ],
          },
        },
      },

      {
        name: TASK_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: TASK_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/task.proto'),
          url: 'task-service:5003',  // 'localhost:5003' for local testing
        },
      },
           {
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/auth.proto'),
          url: 'auth-service:5004',
        },
      },
    ]),
  ],
  controllers: [
    AppController,
    ProductController,
    ProjectController,
    UserManagementController,
    TasksController,
    AuthController
 
  ],
  providers: [AppService,{
  provide: APP_GUARD,
  useClass: ThrottlerGuard
}],
})
export class AppModule {}
