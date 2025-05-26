import { ProductsService } from './products/products.service';
import { DatabaseModule } from './../../../../libs/common/src/Database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './products/product.controller';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [
    DatabaseModule,
    ProductsModule,
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
