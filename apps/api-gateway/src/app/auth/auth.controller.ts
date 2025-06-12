import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME, AuthServiceClient, LoginResponse, ValidateUserResponse } from 'types/proto/auth';

@Controller('auth')
export class AuthController implements OnModuleInit {
    private authService: AuthServiceClient;

    constructor(@Inject(AUTH_PACKAGE_NAME) private client: ClientGrpc) {}

    onModuleInit() {
        this.authService = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    }

    @Post('login')
    login(@Body() request: { email: string; password: string }):Observable<LoginResponse> {
       // console.log('Login request:', request);
        return this.authService.login(request);
    }

    @Post('validate')
    validateUser(@Body() request: { userId: string; token: string }):Observable<ValidateUserResponse> {
        return this.authService.validateUser(request);
    }
}
