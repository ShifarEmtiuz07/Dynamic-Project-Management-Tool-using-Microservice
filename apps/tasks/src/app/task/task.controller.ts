import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {  CreateTaskRequest, CreateTaskResponse, DeleteTaskRequest, DeleteTaskResponse, Empty, GetTaskRequest, GetTaskResponse, ListTasksRequest, ListTasksResponse, RemoveUserFromTaskRequest, RemoveUserFromTaskResponse, Task, TaskServiceController, TaskServiceControllerMethods, UpdateTaskRequest, UpdateTaskResponse } from './../../../../../types/proto/task';
import { TaskEntity } from 'libs/shared-entities/src/lib/task.entity';
import { UserEntity } from 'libs/shared-entities/src/lib/user.entity';


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
  async updateTask(request: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    return await this.taskService.updateTask(request);
  }
  async deleteTask(request: DeleteTaskRequest): Promise<DeleteTaskResponse> {
    return await this.taskService.deleteTask(request.id);
  }


   async assignTasks(request: Empty): Promise<ListTasksResponse> {
      const result = await this.taskService.assignTasks(request);

  // Map TaskEntity to Task (as an array)
  const tasks: Task[] = Array.isArray(result)
    ? result.map((taskEntity: TaskEntity) => ({
        id: taskEntity.id,
        title: taskEntity.title,
        requiredSkills: taskEntity.requiredSkills,
        priority: taskEntity.priority,
        status: taskEntity.status,
        users: taskEntity.users
          ? {
              id: taskEntity.users.id,
              username: taskEntity.users.userName,
              role: taskEntity.users.roles,
            }
          : {},
      }))
    : [];

  return { tasks };
     
   }

 
}
