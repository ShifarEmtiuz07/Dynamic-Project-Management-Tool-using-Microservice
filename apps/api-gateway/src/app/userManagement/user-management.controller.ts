import { Body, Controller, Delete, Get, Inject, OnModuleInit, Param, Patch, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateUserRequest, Empty, UpdateUserRequest, USER_PACKAGE_NAME, USER_SERVICE_NAME, UserId, UserServiceClient } from 'types/proto/user';

@Controller('user-management')
export class UserManagementController implements OnModuleInit {

    private userManagementService:UserServiceClient;

    constructor(@Inject (USER_PACKAGE_NAME) private client:ClientGrpc ){}

    onModuleInit(){
        this.userManagementService= this.client.getService<UserServiceClient>(USER_SERVICE_NAME)
    }

    @Post()
    createUser(@Body() request: CreateUserRequest ){
    
        return this.userManagementService.createUser(request);
    }

    @Get(':id')
    getUser(@Param('id') id:number){
         return this.userManagementService.getUser({id});
    }

    @Get()
    listUsers(request: Empty){
         return this.userManagementService.listUsers(request);
    }

    @Patch()
    updateUser(@Body() request: UpdateUserRequest){
         return this.userManagementService.updateUser(request);
    }

    @Delete(':id')
    deleteUser(@Param('id') id:number){
         return this.userManagementService.deleteUser({id});
    }

}
