import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Project } from 'apps/projects/src/app/project/entities/project.entity';
//import { ProductsController } from './productsss.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product,Project])],
  controllers: [ProductController],
  providers: [ProductsService],
})
export class ProductsModule {}
