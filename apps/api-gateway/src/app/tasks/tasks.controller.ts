import { Body, Controller, Delete, Get, Inject, OnModuleInit, Param, Patch, Post, UseGuards } from '@nestjs/common';
import {  AddUserToTaskRequest, CreateTaskRequest, CreateTaskResponse, DeleteTaskRequest, DeleteTaskResponse, Empty, GetTaskRequest, GetTaskResponse, ListTasksRequest, ListTasksResponse, TASK_PACKAGE_NAME, TASK_SERVICE_NAME, TaskServiceClient, UpdateTaskRequest, UpdateTaskResponse } from './../../../../../types/proto/task';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Task } from 'types/proto/user';
import { Roles } from 'libs/common/src/guard/roles.decorator';
import { RolesGuard } from 'libs/common/src/guard/roles.guard';
import { AuthGuard } from 'libs/common/src/guard/auth.guard';


@Controller('tasks')
export class TasksController implements OnModuleInit {

  private taskService:TaskServiceClient;
  constructor(@Inject(TASK_PACKAGE_NAME) private client: ClientGrpc) {}
  onModuleInit() {
   
    this.taskService = this.client.getService<TaskServiceClient>(TASK_SERVICE_NAME);
  }

@Roles('hr')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
  @Post()
    createTask(@Body() request: CreateTaskRequest): Observable<CreateTaskResponse> {
       
       
        return this.taskService.createTask(request);
    }

    
@Roles('hr')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
    @Post('assign-tasks')
    assignTasks(request:Empty): Observable<ListTasksResponse> {
       
        return this.taskService.assignTasks(request);
    }
      
@Roles('hr')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
       @Post('reassign-tasks')
    manuallyReassignTask(@Body() request:AddUserToTaskRequest): Observable<ListTasksResponse> {
        //console.log('Reassigning task with request:', request);
       
        return this.taskService.manuallyReassignTask(request);
    }


    
@Roles('hr')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
   @Get(':id')
    getTask(@Param('id') id: number): Observable<Task> { 
       
        return this.taskService.getTask({id});   
    }  
    
    
@Roles('hr')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
    @Get('all-tasks')
    listTasks(request: ListTasksRequest): Observable<ListTasksResponse> {
        
        return this.taskService.listTasks(request);
    }

    
@Roles('hr')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
    @Patch()
    updateTask(request: UpdateTaskRequest): Observable<Task> {

        return this.taskService.updateTask(request);
    }

    
@Roles('hr')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
    @Delete()
    deleteTask(request: DeleteTaskRequest): Observable<DeleteTaskResponse> {    
        
        return this.taskService.deleteTask(request);
    }
                         

}
