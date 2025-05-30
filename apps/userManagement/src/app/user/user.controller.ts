import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserRequest,  Empty,  UpdateUserRequest,  User,  UserId,  UserList,  UserServiceController, UserServiceControllerMethods } from 'types/proto/user';
import { Observable } from 'rxjs';


@Controller('user-management')
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}


async createUser(request: CreateUserRequest): Promise<User> {
  return await this.userService.createUser(request);
}

async  getUser(request: UserId): Promise<User>{
 
  return await this.userService.findOne(request);
}

async listUsers(request: Empty): Promise<UserList> {
  const users = await this.userService.findAll(request);
  return { users };
}

async  updateUser(request: UpdateUserRequest): Promise<User> {
   return await this.userService.update(request);
}

async deleteUser(request: UserId): Promise<User> {
   return await this.userService.delete(request);
}

}
