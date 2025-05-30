import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {  CreateTaskRequest, CreateTaskResponse, DeleteTaskRequest, DeleteTaskResponse, GetTaskRequest, GetTaskResponse, ListTasksRequest, ListTasksResponse, RemoveUserFromTaskRequest, RemoveUserFromTaskResponse, Task, TaskServiceController, TaskServiceControllerMethods, UpdateTaskRequest, UpdateTaskResponse } from './../../../../../types/proto/task';


@Controller('tasks')
@TaskServiceControllerMethods()
export class TaskController implements TaskServiceController {
  constructor(private readonly taskService: TaskService) {}


  async createTask(request: CreateTaskRequest): Promise<CreateTaskResponse> {
   
    return await this.taskService.createTask(request);
  } 
  async getTask(request: GetTaskRequest): Promise<GetTaskResponse> {
  
    return await this.taskService.getTask(request.id);
  }
  async listTasks(request: ListTasksRequest): Promise<ListTasksResponse> {
    return await this.taskService.listTasks();
   
  }   
  async updateTask(request: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    return await this.taskService.updateTask(request);
  }
  async deleteTask(request: DeleteTaskRequest): Promise<DeleteTaskResponse> {
    return await this.taskService.deleteTask(request.id);
  }
  // async addUserToTask(request:AddUserToTaskRequest): Promise<AddUserToTaskResponse> {
  //   return await this.taskService.addUserToTask(request);
  // }
  // async removeUserFromTask(request: RemoveUserFromTaskRequest): Promise<RemoveUserFromTaskResponse> {
  //   return await this.taskService.removeUserFromTask(request);
  // }



 
}
