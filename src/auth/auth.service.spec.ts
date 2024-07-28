// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthService } from './auth.service';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from './../user/user.service';

// import { AuthModule } from './auth.module';
// import { MongooseModule } from '@nestjs/mongoose';
// import { User } from 'src/user/entities/user.entity';

// describe('AuthService', () => {
//   let service: AuthService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [AuthModule, MongooseModule, User],
//       providers: [AuthService, UserService, JwtService],
//     }).compile();

//     service = module.get<AuthService>(AuthService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('should return a string', () => {
//     const email = 'kennie@mail.com';
//     const pass = '12345678';
//     expect(typeof service.signIn(email, pass)).toEqual('object');
//   });
// });
