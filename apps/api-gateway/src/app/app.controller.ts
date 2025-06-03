import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 
  getData() {
    return this.appService.getData();
  }
   // Allow 2 requests every 10 seconds
    // Allow 2 requests every 10 seconds
  //  @Get()
  //   getHello() {
  //   return 'This is a test endpoint for throttling';
  // }

}
