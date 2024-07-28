// import { Test, TestingModule } from '@nestjs/testing';
// import * as request from 'supertest';
// import { UserModule } from './user.module';
// import { INestApplication } from '@nestjs/common';
// import { User, UserSchema } from './entities/user.entity';
// import { MongooseModule } from '@nestjs/mongoose';

// describe('UserController', () => {
//   let app: INestApplication;
//   let userService = {
//     findAll: () => [
//       {
//         id: 1,
//         name: 'Kennie',
//         email: 'kennie@email.com',
//         password: '123456',
//         gender: 'male',
//       },
//     ],
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [UserModule, User, MongooseModule],
//     }).compile();

//     app = module.createNestApplication();
//     await app.init();
//   });

//   describe('/GET user', () => {
//     it('should be defined', () => {
//       expect(userService.findAll).toBeDefined();
//     });
//     it('should return an array of users', () => {
//       return request(app.getHttpServer())
//         .get('/user')
//         .expect(200)
//         .expect(userService.findAll());
//     });
//   });
//   afterAll(async () => {
//     await app.close();
//   });
// });
