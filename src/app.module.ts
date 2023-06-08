import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MyserviceService } from './myservice/myservice.service';
import { MyServiceModule } from './myservice/myservice.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    MyServiceModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.development.env'],
      isGlobal: true,
    }),
    //ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService, MyserviceService],
})
export class AppModule {}
