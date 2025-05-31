import { Body, Controller, Delete, Get, Inject, OnModuleInit, Param, Patch, Post } from '@nestjs/common';
import {  AddUserToTaskRequest, CreateTaskRequest, CreateTaskResponse, DeleteTaskRequest, DeleteTaskResponse, Empty, GetTaskRequest, GetTaskResponse, ListTasksRequest, ListTasksResponse, TASK_PACKAGE_NAME, TASK_SERVICE_NAME, TaskServiceClient, UpdateTaskRequest, UpdateTaskResponse } from './../../../../../types/proto/task';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Task } from 'types/proto/user';


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

    @Post('assign-tasks')
    assignTasks(request:Empty): Observable<ListTasksResponse> {
       
        return this.taskService.assignTasks(request);
    }

       @Post('reassign-tasks')
    manuallyReassignTask(request:AddUserToTaskRequest): Observable<ListTasksResponse> {
       
        return this.taskService.manuallyReassignTask(request);
    }


   @Get(':id')
    getTask(@Param('id') id: number): Observable<Task> { 
       
        return this.taskService.getTask({id});   
    }  
    
    @Get('all-tasks')
    listTasks(request: ListTasksRequest): Observable<ListTasksResponse> {
        
        return this.taskService.listTasks(request);
    }

    @Patch()
    updateTask(request: UpdateTaskRequest): Observable<Task> {

        return this.taskService.updateTask(request);
    }
    @Delete()
    deleteTask(request: DeleteTaskRequest): Observable<DeleteTaskResponse> {    
        
        return this.taskService.deleteTask(request);
    }
                         

}
