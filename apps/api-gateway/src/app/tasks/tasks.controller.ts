import { Body, Controller, Delete, Get, Inject, OnModuleInit, Param, Patch, Post } from '@nestjs/common';
import {  CreateTaskRequest, CreateTaskResponse, DeleteTaskRequest, DeleteTaskResponse, GetTaskRequest, GetTaskResponse, ListTasksRequest, ListTasksResponse, TASK_PACKAGE_NAME, TASK_SERVICE_NAME, TaskServiceClient, UpdateTaskRequest, UpdateTaskResponse } from './../../../../../types/proto/task';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';


@Controller('tasks')
export class TasksController implements OnModuleInit {

  private taskService:TaskServiceClient;
  constructor(@Inject(TASK_PACKAGE_NAME) private client: ClientGrpc) {}
  onModuleInit() {
   
    this.taskService = this.client.getService<TaskServiceClient>(TASK_SERVICE_NAME);
  }

  @Post()
    createTask(@Body() request: CreateTaskRequest): Observable<CreateTaskResponse> {
       
       
        return this.taskService.createTask(request);
    }

   @Get(':id')
    getTask(@Param('id') id: number): Observable<GetTaskResponse> { 
       
        return this.taskService.getTask({id});   
    }  
    
    @Get('all-tasks')
    listTasks(request: ListTasksRequest): Observable<ListTasksResponse> {
        
        return this.taskService.listTasks(request);
    }

    @Patch()
    updateTask(request: UpdateTaskRequest): Observable<UpdateTaskResponse> {

        return this.taskService.updateTask(request);
    }
    @Delete()
    deleteTask(request: DeleteTaskRequest): Observable<DeleteTaskResponse> {    
        
        return this.taskService.deleteTask(request);
    }
                         

}
