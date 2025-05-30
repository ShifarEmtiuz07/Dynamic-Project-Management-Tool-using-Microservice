import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskRequest, CreateTaskResponse, Task, UpdateTaskRequest } from 'types/proto/task';
import { Repository } from 'typeorm';
import { TaskEntity } from '../../../../../libs/shared-entities/src/lib/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../../../libs/shared-entities/src/lib/user.entity';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(TaskEntity) private readonly taskRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  
  ){}
  async createTask(createTask: CreateTaskRequest) {
    try{


      console.log( createTask);
      const usersId: number[] = createTask.assignedTo || [];
     // console.log('Creating task with assigned users:', usersId);

      const users = await Promise.all(
       usersId.map(async (userId) => {
          return this.userRepository.findOne({ where: { id: userId } });
        })
      );
      //console.log( createTask.assignedTo);



  const task =await this.taskRepository.create({
  title: createTask.title,
  requiredSkills: createTask.requiredSkills,
  priority: createTask.priority,
  status: createTask.status,
  //assignedTo: createTask.assignedTo,
  users:users
});
const savedTask = await this.taskRepository.save(task);

//console.log('Task created:', savedTask);

      const createNewTask: Task = {
        id: savedTask.id,
        title: savedTask.title,
        requiredSkills: savedTask.requiredSkills,
        priority: savedTask.priority,
        status: savedTask.status,
       users: savedTask.users.map(user => ({
          id: user.id,    
          username: user.userName,
          role: user.roles.map(role => role).join(', '), 
        })),

      };  

       return { message: 'Task created successfully', task: createNewTask };
    }catch (error) {
      console.error('Error creating task:', error);
      throw new Error('Failed to create task');
    }
    
  }

async  getTask(id: number) {

  try{

     console.log(`Retrieving task with ID: ${id}`);

    const findTask = await this.taskRepository.findOne({ where: { id:id },relations: ['users'] });

    if(!findTask) {
      throw new Error(`Task with ID ${id} not found`); 
    } 

    console.log('Task found:', findTask);

    const task :Task={
      id: findTask.id,
      title: findTask.title,
      requiredSkills: findTask.requiredSkills,
      priority: findTask.priority,
      status: findTask.status,
      users: findTask.users.map(user => ({
        id: user.id,
        username: user.userName,
        role: user.roles.map(role => role).join(', '), 
      })),
    }
    
    return { message: `Task with ID ${id} retrieved successfully` ,task: task };
  }catch(error) {
    console.error('Error retrieving task:', error);
  }
}
   

 async listTasks() {

 try{

    const tasks =await this.taskRepository.find();

    if (!tasks || tasks.length === 0) {
      throw new Error('No tasks found');
    }
    const taskList = tasks.map(task => ({
      id: task.id,
      title: task.title,
      requiredSkills: task.requiredSkills,
      priority: task.priority,
      status: task.status,
      users: task.users.map(user => ({
        id: user.id,
        username: user.userName,
        role: user.roles.map(role => role).join(', '), 
      })),
    }));
    // Logic to list all tasks
    return { message: 'List of all tasks', tasks: taskList };

 }catch(error) {
    console.error('Error listing tasks:', error); 
 }  
  }

 async updateTask(request: UpdateTaskRequest) {

   try{

     const taskId= request.id;
    const task= await this.taskRepository.findOne({ where: { id: taskId } });
    if (!task) {
      throw new Error(`Task with ID ${taskId} not found`);
    }

    const usersId: number[] = request.assignedTo || [];

      const users = await Promise.all(
        usersId.map(async (userId) => {
          return this.userRepository.findOne({ where: { id: userId } });
        })
      );


    Object.assign(task, {
      title: request.title, 
      requiredSkills: request.requiredSkills,
      priority: request.priority,
      status: request.status,
       users:users})
      //assignedTo: request.assignedTo,

    const updatedTask = await this.taskRepository.save(task);
    const updateTaskDto: Task = {      
      id: updatedTask.id,
      title: updatedTask.title,
      requiredSkills: updatedTask.requiredSkills,
      priority: updatedTask.priority,
      status: updatedTask.status,
      users: updatedTask.users.map(user => ({
        id: user.id,    
        username: user.userName,
        role: user.roles.map(role => role).join(', '),
      })),
    };

    // Logic to update a task by ID
    return { message: `Task with ID ${taskId} updated successfully`, task: updateTaskDto };

   }catch(error) {
    console.error('Error updating task:', error);
    throw new Error('Failed to update task');

  }
}

 async deleteTask(id: number) {

    try{      
    const task=await this.taskRepository.findOne({ where: { id: id } });
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }

    await this.taskRepository.remove(task);
    return { message: `Task with ID ${id} deleted successfully`,success:true };
  }
catch(error) {
      console.error('Error deleting task:', error);
      throw new Error('Failed to delete task');     
    }


}

}
