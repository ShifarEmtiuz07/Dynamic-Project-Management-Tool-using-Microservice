import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Product } from 'apps/products/src/app/products/entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Project,Product])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}

