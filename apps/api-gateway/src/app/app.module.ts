import { PRODUCTS_PACKAGE_NAME } from './../../../../types/proto/products';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ProductController } from './product/product.controller';
import { PROJECT_PACKAGE_NAME } from './../../../../types/proto/project';
import { ProjectController } from './project/project.controller';


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
    ]),
  ],
  controllers: [AppController, ProductController, ProjectController],
  providers: [AppService],
})
export class AppModule {}
