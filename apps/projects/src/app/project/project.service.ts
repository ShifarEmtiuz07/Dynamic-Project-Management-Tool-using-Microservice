import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectRequest, ProjectRequest, ProjectResponse } from 'types/proto/project';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../../../../../libs/shared-entities/src/lib/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {

  constructor(@InjectRepository(Project) private readonly projectRepository:Repository<Project>){}


 async create(request: CreateProjectRequest) : Promise<ProjectResponse>{
   const project= await this.projectRepository.create(request);
   const savedProject= await this.projectRepository.save(project);
   return{
    projectId:savedProject.id,
    name:savedProject.name,
    description:savedProject.description
   };
  }



 async findOne(request: ProjectRequest) {

    const product= await this.projectRepository.findOne({where:{id:request.projectId}})

    return product;
  }

}
