import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { BloggingModule } from './blogging/blogging.module';
import * as Joi from 'joi';
import configuration from './config/configuration';

const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').required(),
  PORT: Joi.number().default(3000),
  DBURL: Joi.string(),
  JWTSECRET: Joi.string(),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
      isGlobal: true,
      load: [configuration],
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DBURL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<string>('NODE_ENV') === 'development',
        logging: configService.get<string>('NODE_ENV') === 'development',
        environment: configService.get<string>('NODE_ENV'),
        //migrationsRun: true,
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        ssl: true,
      }),
    }),
    UserModule,
    AuthModule,
    ChatModule,
    BloggingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
