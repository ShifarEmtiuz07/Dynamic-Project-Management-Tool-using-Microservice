import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { CreateAuthServiceDto } from './dto/create-auth-service.dto';
import { UpdateAuthServiceDto } from './dto/update-auth-service.dto';
import { AuthServiceControllerMethods, LoginRequest, ValidateUserRequest,AuthServiceController, LoginResponse, ValidateUserResponse } from 'types/proto/auth';

@Controller('auth')
@AuthServiceControllerMethods()

export class AuthController implements AuthServiceController{
  constructor(private readonly authServiceService: AuthServiceService) {}

  @Post()
  login(@Body() request: LoginRequest): Promise<LoginResponse> {
    //console.log('Login request:', request);
    return this.authServiceService.login(request);
  }

  @Post()
  validateUser(@Body() request: ValidateUserRequest): Promise<ValidateUserResponse> {
    return this.authServiceService.validateUser(request);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authServiceService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthServiceDto: UpdateAuthServiceDto) {
  //   return this.authServiceService.update(+id, updateAuthServiceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authServiceService.remove(+id);
  // }
}
