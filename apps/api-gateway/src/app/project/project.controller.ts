import { Body, Controller, Get, Inject, OnModuleInit, Param, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateProjectRequest, PROJECT_PACKAGE_NAME, PROJECT_SERVICE_NAME, ProjectServiceClient } from 'types/proto/project';

@Controller('project')
export class ProjectController implements OnModuleInit {

private projectService:ProjectServiceClient;

constructor (@Inject(PROJECT_PACKAGE_NAME) private client:ClientGrpc){}

onModuleInit() {
    this.projectService= this.client.getService<ProjectServiceClient>(PROJECT_SERVICE_NAME);
}

@Post()
create(@Body() createProjectRequest:CreateProjectRequest ){
    return this.projectService.create(createProjectRequest);
}

@Get(':id')
findOne(@Param('id') id:number){
    return this.projectService.getProject({projectId:id})
}

}
