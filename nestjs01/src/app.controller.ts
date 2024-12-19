import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // decorator
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  //@Something()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/gioi-thieu')
  getAbout() {
    return this.appService.getAbout();
  }
}
