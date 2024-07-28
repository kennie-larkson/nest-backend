// import { Test, TestingModule } from '@nestjs/testing';
// import { UserService } from './user.service';

// describe('UserService', () => {
//   let service: UserService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [UserService],
//     }).compile();

//     service = module.get<UserService>(UserService);
//   });

//   describe('findAll function', () => {
//     it('should return an array of users', async () => {
//       const users = [];
//       jest.spyOn(service, 'findAll').mockImplementation(() => users);
//       expect(service.findAll).toBeDefined();
//       expect(service.findAll()).toBe(users);
//     });
//   });
// });
