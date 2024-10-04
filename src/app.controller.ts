import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { NoAuthNeeded } from './auth/decorators/public.decorator';

@Controller('home')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @NoAuthNeeded()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
