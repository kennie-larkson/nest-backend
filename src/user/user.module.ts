import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MyserviceService } from 'src/myservice/myservice.service';

@Module({
  controllers: [UserController],
  providers: [UserService, MyserviceService],
  exports: [UserService],
})
export class UserModule {}
