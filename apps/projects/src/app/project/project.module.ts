import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from 'libs/shared-entities/src/lib/product.entity';
import { Project } from 'libs/shared-entities/src/lib/project.entity';



@Module({
  imports:[TypeOrmModule.forFeature([Project,Product])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}

