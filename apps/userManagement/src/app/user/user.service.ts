import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserRequest, Empty, UpdateUserRequest, User, UserId } from 'types/proto/user';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../../../libs/shared-entities/src/lib/user.entity';
import { Repository } from 'typeorm';
import { Role as EntityRole } from 'libs/common/src/utils/role.enum';



// const entityToProtoRoleMap: Record<EntityRole, ProtoRole> = {
//   [EntityRole.ROLE_UNSPECIFIED]: ProtoRole.ROLE_UNSPECIFIED,
//   [EntityRole.Manager]: ProtoRole.Manager,
//   [EntityRole.TeamLead]: ProtoRole.TeamLead,
//   [EntityRole.TeamMember]: ProtoRole.TeamMember,
//   [EntityRole.Hr]: ProtoRole.Hr,
//   [EntityRole.Admin]: ProtoRole.Admin,
// };

// function mapEntityRolesToProtoRoles(entityRoles: EntityRole[] = []): ProtoRole[] {
//   if (!Array.isArray(entityRoles)) {
//     return [];
//   }
//   return entityRoles.map(role => entityToProtoRoleMap[role]);
// }


function toProtoTimestamp(date: Date): { seconds: number; nanos: number } {
  const millis = date.getTime();
  return {
    seconds: Math.floor(millis / 1000),
    nanos: (millis % 1000) * 1_000_000,
  };
}

@Injectable()
export class UserService {


  constructor(@InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>){}


  async createUser(createUserDto: CreateUserRequest): Promise<User> {


    const user= this.userRepository.create({
      userName:createUserDto.userName,
      employeeId:createUserDto.employeeId,
      email:createUserDto.email,
      password:createUserDto.password,
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

 async findOne(id: UserId) {


    const user = await this.userRepository.findOne({ where:{ id: id.id }});
    if (!user) {
      throw new Error(`User with id ${id.id} not found`);
    }
    
    const protoUser: User = {
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
    };
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
