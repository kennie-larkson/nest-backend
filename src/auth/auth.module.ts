import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from './../user/user.module';

import { AuthGuard } from './auth.guard';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { UserService } from './../user/user.service';
//console.log(process.env.NODE_ENV);

@Module({
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,

      useFactory: async (configService: ConfigService) => ({
        secret:
          configService.get<string>('NODE_ENV') === 'production'
            ? configService.get('PROD_JWT_SECRET')
            : configService.get('DEV_JWT_SECRET'),

        signOptions: {
          expiresIn:
            configService.get<string>('NODE_ENV') === 'production'
              ? configService.get('PROD_JWT_TOKEN_EXPIRATION')
              : configService.get('DEV_JWT_TOKEN_EXPIRATION'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: 'APP_GUARD', useClass: AuthGuard }],
  // providers: [
  //   AuthService,
  //   { provide: 'APP_GUARD', useExisting: AuthGuard },
  //   AuthGuard,
  // ],
})
export class AuthModule {}
