import { Module } from '@nestjs/common';
import { MyserviceService } from './myservice.service';

@Module({ providers: [MyserviceService], exports: [MyserviceService] })
export class MyServiceModule {}
