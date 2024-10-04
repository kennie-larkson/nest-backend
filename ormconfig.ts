import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';

async function initializeDataSource() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);

  const dataSource = new DataSource({
    type: 'postgres',
    url: configService.get<string>('DBURL'),
    database: configService.get<string>('DATABASE'),
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/**/*{.ts,.js}'],
    migrationsTableName: 'migrations',
  });

  //await dataSource.initialize();
  return dataSource;
}

export default initializeDataSource();
