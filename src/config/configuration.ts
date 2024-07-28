import { resolve } from 'path';

export enum Environment {
  development = 'development',
  production = 'production',
}

export type EnvTypes = {
  port: number;
  secret: string;
  environment: string;
  //   rootDir: string;
  //   workDir: string;
  //   uploadDir: string;
  dbUrl: string;
  devDbUrl: string;
  testDbUrl: string;
  redisUrl: string;
  jwtSecret: string;
};

export default (): EnvTypes => {
  const environment = process.env.NODE_ENV || 'development';
  return {
    port: parseInt(process.env.PORT || '3000', 10),
    secret: process.env.DEV_JWT_SECRET,
    environment,
    dbUrl: process.env.DB_URL,
    devDbUrl: process.env.DEV_DB_CONTAINER,
    testDbUrl: process.env.TEST_DB_CONTAINER,
    redisUrl: process.env.REDIS_URL,
    // rootDir: resolve(__dirname, '../../'),
    // workDir: resolve(__dirname, '../'),
    // uploadDir: resolve(__dirname, '../', 'upload'),
    jwtSecret: process.env.DEV_JWT_SECRET || 'ihiuqiu',
  };
};
