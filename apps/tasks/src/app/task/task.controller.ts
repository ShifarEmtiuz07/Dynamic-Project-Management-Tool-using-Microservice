import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';

import {  AddUserToTaskRequest, AddUserToTaskResponse, CreateTaskRequest, CreateTaskResponse, DeleteTaskRequest, DeleteTaskResponse, Empty, GetTaskRequest, GetTaskResponse, ListTasksRequest, ListTasksResponse, Task, TaskServiceController, TaskServiceControllerMethods, UpdateTaskRequest, UpdateTaskResponse } from './../../../../../types/proto/task';



@Controller('tasks')
@TaskServiceControllerMethods()
export class TaskController implements TaskServiceController {
  constructor(private readonly taskService: TaskService) {}


  async createTask(request: CreateTaskRequest): Promise<CreateTaskResponse> {
   
    return await this.taskService.createTask(request);
  } 
  async getTask(request: GetTaskRequest): Promise<Task> {
  
    return await this.taskService.getTask(request.id);
  }
  async listTasks(request: ListTasksRequest): Promise<ListTasksResponse> {
    return await this.taskService.listTasks();
   
  }   
  async updateTask(request: UpdateTaskRequest): Promise<Task> {
    return await this.taskService.updateTask(request);
  }
  async deleteTask(request: DeleteTaskRequest): Promise<DeleteTaskResponse> {
    return await this.taskService.deleteTask(request.id);
  }


   async assignTasks(request:Empty): Promise<ListTasksResponse> {
      return await this.taskService.assignTasks(request);
     
   }

  async manuallyReassignTask(request: AddUserToTaskRequest): Promise<ListTasksResponse> {
    return await this.taskService.manuallyReassignTask(request);

 
}

}
