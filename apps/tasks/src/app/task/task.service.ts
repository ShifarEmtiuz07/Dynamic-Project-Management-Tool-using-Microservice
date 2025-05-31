import { calculateScore } from './../../../../../libs/common/src/Algorithm/scoringAlgorithm';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskRequest, CreateTaskResponse, Empty, ListTasksResponse, Task, UpdateTaskRequest } from 'types/proto/task';
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
      const userId:number = createTask.assignedTo ;
       console.log( userId);
        const user= await this.userRepository.findOne({ where: { id: userId } });


        if(!user) {
          throw new Error(`User with ID ${userId} not found`);
        }
  const task =await this.taskRepository.create({
  title: createTask.title,
  requiredSkills: createTask.requiredSkills,
  priority: createTask.priority,
  status: createTask.status,
  //assignedTo: createTask.assignedTo,
  users:null,
});
const savedTask = await this.taskRepository.save(task);

//console.log('Task created:', savedTask);

      const createNewTask: Task = {
        id: savedTask.id,
        title: savedTask.title,
        requiredSkills: savedTask.requiredSkills,
        priority: savedTask.priority,
        status: savedTask.status,
       users: {
          id: savedTask.users.id,
          username: savedTask.users.userName,
          role: savedTask.users.roles // Assuming roles is an array
       }
       }

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

    return {
      id: findTask.id,
      title: findTask.title,
      requiredSkills: findTask.requiredSkills,
      priority: findTask.priority,
      status: findTask.status,
      users: findTask.users?{ id:findTask.users.id || null, // Ensure users.id is not null
        username: findTask.users.userName || null, // Ensure users.userName is not null
        role: findTask.users.roles || null ,// Ensure users.roles is not null    ,
    }: null ,// Handle case where users is null
    
  
  }
}catch(error) {
    console.error('Error retrieving task:', error);
  }
}
   

//  async listTasks() : Promise<ListTasksResponse> {

//  try{

//     const tasks =await this.taskRepository.find();

//     if (!tasks || tasks.length === 0) {
//       throw new Error('No tasks found');
//     }

//     return tasks.map(task => ({
//       id: task.id,
//       title: task.title,
//       requiredSkills: task.requiredSkills,
//       priority: task.priority,
//       status: task.status,
//       users: {
//         id: task.users.id,
//         username: task.users.userName,
//         role: task.users.roles
//  }}))
//  }catch(error) {
//     console.error('Error listing tasks:', error); 
//  }  
//   }

async listTasks(): Promise<ListTasksResponse> {
  try {
    const tasks = await this.taskRepository.find();

    if (!tasks || tasks.length === 0) {
      throw new Error('No tasks found');
    }

    return {
      tasks: tasks.map(task => ({
        id: task.id,
        title: task.title,
        requiredSkills: task.requiredSkills,
        priority: task.priority,
        status: task.status,
        users: {
          id: task.users.id,
          username: task.users.userName,
          role: task.users.roles,
        },
      })),
    };
  } catch (error) {
    console.error('Error listing tasks:', error);
    throw error;
  }
}

 async updateTask(request: UpdateTaskRequest) {

   try{

     const taskId= request.id;
    const task= await this.taskRepository.findOne({ where: { id: taskId } });
    if (!task) {
      throw new Error(`Task with ID ${taskId} not found`);
    }

    const userId: number = request.assignedTo;

      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!user) {
        throw new Error(`User with ID ${userId} not found`);    
      }
    


    Object.assign(task, {
      title: request.title, 
      requiredSkills: request.requiredSkills,
      priority: request.priority,
      status: request.status,
       users:{
        id: user.id,
        userName: user.userName,
        roles: user.roles // Assuming roles is an array
       }})
      //assignedTo: request.assignedTo,

    const updatedTask = await this.taskRepository.save(task);
   return {      
      id: updatedTask.id,
      title: updatedTask.title,
      requiredSkills: updatedTask.requiredSkills,
      priority: updatedTask.priority,
      status: updatedTask.status,
      users: updatedTask.users ? {
        id: updatedTask.users.id, 
        username: updatedTask.users.userName,
        role: updatedTask.users.roles // Assuming roles is an array
      } : null
    };

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

 async assignTasks(request:Empty): Promise<ListTasksResponse> {
   const tasks = await this.taskRepository.find({ where: { status: 'pending',  } }); //users: null
  const users = await this.userRepository.find();

  for (const task of tasks) {
    let bestUser = null;
    let bestScore = -1;

    for (const user of users) {
      if (user.currentTask >= user.maxTask) continue;
      const score = calculateScore(user, task);

      if (score > bestScore) {
        bestScore = score;
        bestUser = user;
      }
    }

    if (bestUser) {

      task.users = bestUser.id;
      task.status = 'in_progress';
      bestUser.currentTasks += 1;

      await this.taskRepository.save(task);
      await this.userRepository.save(bestUser);
    }

    // const  assignedTasks={
    //   id: task.id,
    //   title: task.title,
    //   requiredSkills: task.requiredSkills,
    //   priority: task.priority,
    //   status: task.status,
    //   users: {
    //     id: bestUser.id,
    //     username: bestUser.userName,
    //     role: bestUser.roles.map(role => role).join(', '), // Assuming roles is an array
    //   }   
    //  };

    // return {task: assignedTasks };
  }

      return {
      tasks: tasks.map(task => ({
        id: task.id,
        title: task.title,
        requiredSkills: task.requiredSkills,
        priority: task.priority,
        status: task.status,
        users: {
          id: task.users.id,
          username: task.users.userName,
          role: task.users.roles,
        },
      })),
    };

 }


 async  manuallyReassignTask(request): Promise<ListTasksResponse> {

  const taskId = request.id;
  if (!taskId) {      
    throw new Error('Task ID is required for reassignment');
  }
  const emprty = request.empty;

  const task =  await this.taskRepository.findOne({where:{id: taskId}  });
  const oldUser =  await this.userRepository.findOne({ where: { id: task.users.id } });
  if (!task) {  
    throw new Error(`Task with ID ${taskId} not found`);
  }
  if (!oldUser) {
    throw new Error(`User with ID ${task.users.id} not found`);
  }


  if (oldUser) {
    oldUser.currentTask -= 1;
   await this.userRepository.save(oldUser);
  }

  task.users = null;
  task.status = 'pending';
 await this.taskRepository.save(task);

    const tasks = await this.taskRepository.find({ where: { status: 'pending',  } });

  // run assignment again
  await this.assignTasks(emprty);
      return {
      tasks: tasks.map(task => ({
        id: task.id,
        title: task.title,
        requiredSkills: task.requiredSkills,
        priority: task.priority,
        status: task.status,
        users: {
          id: task.users.id,
          username: task.users.userName,
          role: task.users.roles,
        },
      })),
    };   

}

 


}
