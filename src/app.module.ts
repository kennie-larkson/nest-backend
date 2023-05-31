import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MyserviceService } from './myservice/myservice.service';
import { MyServiceModule } from './myservice/myservice.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, MyServiceModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, MyserviceService],
})
export class AppModule {}
