import { Controller, } from '@nestjs/common';
import { ProjectService } from './project.service';

import { CreateProjectRequest, ProjectRequest, ProjectResponse, ProjectServiceController, ProjectServiceControllerMethods } from 'types/proto/project';

import { GrpcMethod } from '@nestjs/microservices';

 // ✅ This decorates methods automatically
//  @ProjectServiceControllerMethods()
@Controller()
@ProjectServiceControllerMethods()

export class ProjectController implements ProjectServiceController {
  constructor(private readonly projectService: ProjectService) {}

  // @GrpcMethod('ProjectService', 'createProject')
  async create(request: CreateProjectRequest): Promise<ProjectResponse>  {
    return this.projectService.create(request);
  }

  //@GrpcMethod('ProjectService', 'getProject')
  async getProject(request: ProjectRequest): Promise<ProjectResponse> {
    const project = await this.projectService.findOne(request);
    return{
      projectId:project.id,
      name:project.name,
      deccription:project.deccription,


    }
  }




}
