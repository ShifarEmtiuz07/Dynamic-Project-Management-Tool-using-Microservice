import { RolesGuard } from './../../../../../libs/common/src/guard/roles.guard';
import { Roles } from './../../../../../libs/common/src/guard/roles.decorator';
import { AuthGuard } from '../../../../../libs/common/src/guard/auth.guard';
import { Body, Controller, Delete, Get, Inject, OnModuleInit, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Throttle } from '@nestjs/throttler';
import { CreateUserRequest, Empty, UpdateUserRequest, USER_PACKAGE_NAME, USER_SERVICE_NAME, UserId, UserServiceClient } from 'types/proto/user';



@Controller('user-management')
export class UserManagementController implements OnModuleInit {

    private userManagementService:UserServiceClient;

    constructor(@Inject (USER_PACKAGE_NAME) private client:ClientGrpc ){}

    onModuleInit(){
        this.userManagementService= this.client.getService<UserServiceClient>(USER_SERVICE_NAME)
    }

    
// @Roles('hr')
// @UseGuards(RolesGuard)
// @UseGuards(AuthGuard)
    @Post()
    createUser(@Body() request: CreateUserRequest ){
     
        return this.userManagementService.createUser(request);
    }

    
@Roles('hr')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)

    @Get(':id')
    getUser(@Param('id') id:number){
         return this.userManagementService.getUser({id});
    }


//   @Roles('TeamMember')
//   @UseGuards(RolesGuard)
//     @UseGuards(AuthGuard)
    @Get()
    listUsers(request: Empty){
         return this.userManagementService.listUsers(request);
    }

    
@Roles('hr')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
    @Patch()
    updateUser(@Body() request: UpdateUserRequest){
         return this.userManagementService.updateUser(request);
    }

    
@Roles('hr')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
    @Delete(':id')
    deleteUser(@Param('id') id:number){
         return this.userManagementService.deleteUser({id});
    }

}
