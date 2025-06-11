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

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: PRODUCTS_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/products.proto'),
          url: 'localhost:5000',
        },
      },

      {
        name: PROJECT_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: PROJECT_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/project.proto'),
          url: 'localhost:5001',
        },
      },

      {
        name: USER_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: USER_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/user.proto'),
          url: 'localhost:5002',
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
          url: 'localhost:5003',
        },
      },
           {
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/auth.proto'),
          url: 'localhost:5004',
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
    AuthController,
  ],
  providers: [AppService],
})
export class AppModule {}
