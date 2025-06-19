import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { Cache } from '@nestjs/cache-manager';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserRequest, Empty, UpdateUserRequest, User, UserId } from 'types/proto/user';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../../../libs/shared-entities/src/lib/user.entity';
import { Repository } from 'typeorm';
import { Role as EntityRole } from 'libs/common/src/utils/role.enum';
import * as bcrypt from 'bcryptjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';



function toProtoTimestamp(date: Date): { seconds: number; nanos: number } {
  const millis = date.getTime();
  return {
    seconds: Math.floor(millis / 1000),
    nanos: (millis % 1000) * 1_000_000,
  };
}

@Injectable()
export class UserService implements OnModuleInit{


  constructor(@InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>,@Inject(CACHE_MANAGER) private cacheManager: Cache){console.log('CacheManager exists:', !!cacheManager);}

async onModuleInit() {
  try {
    await this.cacheManager.set('redis_connection_test', 'OK', 10);
    const test = await this.cacheManager.get('redis_connection_test');
    if (test === 'OK') {
      console.log( 'Redis connection test passed');
    } else {
      console.error(' Redis connection test failed: Unexpected value', test);
    }
  } catch (err) {
    console.error(' Redis connection test failed:', err);
  }
}

  async createUser(createUserDto: CreateUserRequest): Promise<User> {

     const password = createUserDto.password;
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);


    const user= this.userRepository.create({
      userName:createUserDto.userName,
      employeeId:createUserDto.employeeId,
      email:createUserDto.email,
      password:hashedPassword,
      phone:createUserDto.phone,
      maxTask:createUserDto.maxTask,
      currentTask:createUserDto.currentTask,
      status:createUserDto.status,
      skills:createUserDto.skills,
      roles:createUserDto.roles,
      
      
      
    })

      const savedUser = await this.userRepository.save(user);
      //console.log(savedUser);
     return {
    id: savedUser.id,
    userName: savedUser.userName,
    //userImage: savedUser.userImage,
    employeeId: savedUser.employeeId,
    email: savedUser.email,
    //password: savedUser.password,
    phone: savedUser.phone,
    currentTask: savedUser.currentTask,
    maxTask: savedUser.maxTask,
    status: savedUser.status,
    roles: savedUser.roles,
    skills: savedUser.skills,
    tasks: savedUser.tasks || [],
     createdAt: toProtoTimestamp(savedUser.created_at),
    updatedAt: toProtoTimestamp(savedUser.updated_at)
  };
}


 async findAll(request: Empty) {
    const users =await this.userRepository.find();
    if (!users) {   
      throw new Error('No users found');
    }
    const protoUsers: User[] = users.map(user => ({
      id: user.id,
      userName: user.userName,
      //userImage: user.userImage,
      employeeId: user.employeeId,
      email: user.email,
      phone: user.phone,
      currentTask: user.currentTask,
      maxTask: user.maxTask,
      status: user.status,
      roles: user.roles,
      skills: user.skills,
      tasks: user.tasks || [],
     
       createdAt: toProtoTimestamp(user.created_at),
  updatedAt: toProtoTimestamp(user.updated_at)
    }));
    
    return protoUsers;
  }

//  async findOne(id: UserId) {


//     const key = 'test:key';
//   const value = { hello: 'world', timestamp: Date.now() };

//   await this.cacheManager.set(key, JSON.stringify(value), 60);
//   console.log(' Manually saved value:', value);

//   const raw = await this.cacheManager.get<string>(key);
//   console.log(' Manually read from Redis:', raw);

  



//       const cacheKey = `user:${id.id}`;
//       console.log('Cache keyID:', cacheKey);
//     //const cached:User = await this.cacheManager.get(cacheKey);
//     //const cached:User = await this.cacheManager.get<User>(cacheKey);
//     //console.log('Cached userid:', cached);

// //     const cached = await this.cacheManager.get<string>(cacheKey);
// // console.log('Raw cached:', cached);

// const cached:User = await this.cacheManager.get(cacheKey);
// console.log('Raw cacheded:', cached);

//     // if (cached){
      
//     //    console.log('cached from cache:', cached);
//     //   const cacheUser: User = {
//     //   id: cached.id,
//     //   userName: cached.userName,
//     //   //userImage: user.userImage,
//     //   employeeId: cached.employeeId,
//     //   email: cached.email,
//     //   phone: cached.phone,
//     //   currentTask: cached.currentTask,
//     //   maxTask: cached.maxTask,
//     //   status: cached.status,
//     //   roles: cached.roles,
//     //   skills: cached.skills,
//     //   tasks: cached.tasks || [], 
//     //   createdAt: typeof cached.createdAt === 'string' ? toProtoTimestamp(new Date(cached.createdAt)) : cached.createdAt,
//     //   updatedAt: typeof cached.updatedAt === 'string' ? toProtoTimestamp(new Date(cached.updatedAt)) : cached.updatedAt,
//     // };
//     // return cacheUser;
//     // } 

 
//          if (cached){
      
//         // const cached = JSON.parse(cachedRaw);
//   console.log('From cached:', cached);
//       const cacheUser: User = {
//       id: cached.id,
//       userName: cached.userName,
//       //userImage: user.userImage,
//       employeeId: cached.employeeId,
//       email: cached.email,
//       phone: cached.phone,
//       currentTask: cached.currentTask,
//       maxTask: cached.maxTask,
//       status: cached.status,
//       roles: cached.roles,
//       skills: cached.skills,
//       tasks: cached.tasks || [], 
//       createdAt: typeof cached.createdAt === 'string' ? toProtoTimestamp(new Date(cached.createdAt)) : cached.createdAt,
//       updatedAt: typeof cached.updatedAt === 'string' ? toProtoTimestamp(new Date(cached.updatedAt)) : cached.updatedAt,
//     };
//     return cacheUser;
//     } 






//     const user = await this.userRepository.findOne({ where:{ id: id.id }});
//     if (!user) {
//       throw new Error(`User with id ${id.id} not found`);
//     }
    
//     const protoUser: User = {
//       id: user.id,
//       userName: user.userName,
//       //userImage: user.userImage,
//       employeeId: user.employeeId,
//       email: user.email,
//       phone: user.phone,
//       currentTask: user.currentTask,
//       maxTask: user.maxTask,
//       status: user.status,
//       roles: user.roles,
//       skills: user.skills,
//       tasks: user.tasks || [], 
//       createdAt: toProtoTimestamp(user.created_at),
//   updatedAt: toProtoTimestamp(user.updated_at)
//     };

//     await this.cacheManager.set(cacheKey, protoUser, 60);
//      console.log(' saved to cache');

//     //await this.cacheManager.set(cacheKey, protoUser)
//     //await this.cacheManager.set(cacheKey, JSON.stringify(protoUser), 60)
//     //.catch(err => console.error('Redis set error:', err));
//     //console.log('Cache after set:', await this.cacheManager.get(cacheKey));
//     console.log('From db:', protoUser);











//     return protoUser;
//   }


// async findOne(id: UserId): Promise<User> {
//   const cacheKey = `user:${id.id}`;
//   console.log(`Checking cache for key: ${cacheKey}`);
//   const cachedRaw = await this.cacheManager.get<string>(cacheKey);
//   console.log(`Raw cache value: ${cachedRaw}`);

//   if (cachedRaw) {
//     try {
//       const cached: User = JSON.parse(cachedRaw);
//       console.log('Parsed cache value:', cached);
//       return {
//         ...cached,
//         createdAt: typeof cached.createdAt === 'string' ? toProtoTimestamp(new Date(cached.createdAt)) : cached.createdAt,
//         updatedAt: typeof cached.updatedAt === 'string' ? toProtoTimestamp(new Date(cached.updatedAt)) : cached.updatedAt,
//       };
//     } catch (err) {
//       console.error('Failed to parse cached value:', err);
//     }
//   }

//   console.log(`Cache miss for key: ${cacheKey}. Querying database.`);
//   const user = await this.userRepository.findOne({ where: { id: id.id } });
//   if (!user) {
//     throw new Error(`User with id ${id.id} not found`);
//   }

//   const protoUser: User = {
//     id: user.id,
//     userName: user.userName,
//     employeeId: user.employeeId,
//     email: user.email,
//     phone: user.phone,
//     currentTask: user.currentTask,
//     maxTask: user.maxTask,
//     status: user.status,
//     roles: user.roles,
//     skills: user.skills,
//     tasks: user.tasks || [],
//     createdAt: toProtoTimestamp(user.created_at),
//     updatedAt: toProtoTimestamp(user.updated_at),
//   };

//   try {
//     await this.cacheManager.set(cacheKey, JSON.stringify(protoUser), 60);
//     console.log(`Cache saved with key: ${cacheKey}`);
//     const verify = await this.cacheManager.get<string>(cacheKey);
//     console.log(`Cache verification: ${verify}`);
//   } catch (err) {
//     console.error('Failed to save to cache:', err);
//   }

//   return protoUser;
// }


// async findOne(id: UserId): Promise<User> {
//   const cacheKey = `user:${id.id}`;
//   console.log(`Checking cache for key: ${cacheKey}`);
//   const cachedRaw = await this.cacheManager.get<string>(cacheKey);
//   console.log(`Raw cache value: ${cachedRaw}`);

//   if (cachedRaw) {
//     try {
//       const cached: User = JSON.parse(cachedRaw);
//       console.log('Parsed cache value:', cached);
//       return {
//         ...cached,
//         createdAt: typeof cached.createdAt === 'string' ? toProtoTimestamp(new Date(cached.createdAt)) : cached.createdAt,
//         updatedAt: typeof cached.updatedAt === 'string' ? toProtoTimestamp(new Date(cached.updatedAt)) : cached.updatedAt,
//       };
//     } catch (err) {
//       console.error('Failed to parse cached value:', err);
//     }
//   }

//   console.log(`Cache miss for key: ${cacheKey}. Querying database.`);
//   const user = await this.userRepository.findOne({ where: { id: id.id } });
//   if (!user) {
//     throw new Error(`User with id ${id.id} not found`);
//   }

//   const protoUser: User = {
//     id: user.id,
//     userName: user.userName,
//     employeeId: user.employeeId,
//     email: user.email,
//     phone: user.phone,
//     currentTask: user.currentTask,
//     maxTask: user.maxTask,
//     status: user.status,
//     roles: user.roles,
//     skills: user.skills,
//     tasks: user.tasks || [],
//     createdAt: toProtoTimestamp(user.created_at),
//     updatedAt: toProtoTimestamp(user.updated_at),
//   };

//   try {
//     await this.cacheManager.set(cacheKey, JSON.stringify(protoUser), 60);
//     console.log(`Cache saved with key: ${cacheKey}`);
//     const verify = await this.cacheManager.get<string>(cacheKey);
//     console.log(`Cache verification: ${verify}`);
//   } catch (err) {
//     console.error('Failed to save to cache:', err);
//   }

//   return protoUser;
// }

async findOne(id: UserId): Promise<User> {
  const cacheKey = `user:${id.id}`;
  console.log(`Checking cache for key: ${cacheKey}`);
  try {
    const cachedRaw = await this.cacheManager.get<string>(cacheKey);
    console.log(`Raw cache value: ${cachedRaw}`);
    if (cachedRaw) {
      const cached: User = JSON.parse(cachedRaw);
      console.log('Parsed cache value:', cached);
      return {
        ...cached,
        createdAt: typeof cached.createdAt === 'string' ? toProtoTimestamp(new Date(cached.createdAt)) : cached.createdAt,
        updatedAt: typeof cached.updatedAt === 'string' ? toProtoTimestamp(new Date(cached.updatedAt)) : cached.updatedAt,
      };
    }
  } catch (err) {
    console.error('Cache retrieval error:', err);
  }

  console.log(`Cache miss for key: ${cacheKey}. Querying database.`);
  const user = await this.userRepository.findOne({ where: { id: id.id } });
  if (!user) {
    throw new Error(`User with id ${id.id} not found`);
  }

  const protoUser: User = {
    id: user.id,
    userName: user.userName,
    employeeId: user.employeeId,
    email: user.email,
    phone: user.phone,
    currentTask: user.currentTask,
    maxTask: user.maxTask,
    status: user.status,
    roles: user.roles,
    skills: user.skills,
    tasks: user.tasks || [],
    createdAt: toProtoTimestamp(user.created_at),
    updatedAt: toProtoTimestamp(user.updated_at),
  };

  try {
    await this.cacheManager.set(cacheKey, JSON.stringify(protoUser), 60);
    console.log(`Cache saved with key: ${cacheKey}`);
    const verify = await this.cacheManager.get<string>(cacheKey);
    console.log(`Cache verification: ${verify}`);
  } catch (err) {
    console.error('Cache save error:', err);
  }

  return protoUser;
}



async  update(request: UpdateUserRequest) {
    const { id,...updateData } = request;
    const user = await this.userRepository.findOne({ where:{id:id} });
    
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    Object.assign(user,updateData );
    const updatedUser=await this.userRepository.save(user);
    //console.log(user);
    return {
      id: updatedUser.id,
      userName: updatedUser.userName,
      //userImage: updatedUser.userImage,
      employeeId: updatedUser.employeeId,
      email: updatedUser.email,
      phone: updatedUser.phone,
      currentTask: updatedUser.currentTask,
      maxTask: updatedUser.maxTask,
      status: updatedUser.status,
      roles: updatedUser.roles,
      skills: updatedUser.skills,
      tasks: updatedUser.tasks || [], 
     createdAt: toProtoTimestamp(updatedUser.created_at),
  updatedAt: toProtoTimestamp(updatedUser.updated_at)
    };
    
  }

async  delete (request: UserId) {
   const user = await this.userRepository.findOne({ where: { id: request.id } });
    if (!user) {        
      throw new Error(`User with id ${request.id} not found`);
    }
    const deletedUser = await this.userRepository.remove(user);
    return {
      id: deletedUser.id,
      userName: deletedUser.userName,
      //userImage: deletedUser.userImage,
      employeeId: deletedUser.employeeId,
      email: deletedUser.email,
      phone: deletedUser.phone,
      currentTask: deletedUser.currentTask,
      maxTask: deletedUser.maxTask,
      status: deletedUser.status,
      roles: deletedUser.roles,
      skills: deletedUser.skills,
      tasks: deletedUser.tasks || [],
      createdAt: toProtoTimestamp(deletedUser.created_at),
  updatedAt: toProtoTimestamp(deletedUser.updated_at)
    };
  }
}
