import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
//import { ProductsController } from './productsss.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductsService],
})
export class ProductsModule {}
