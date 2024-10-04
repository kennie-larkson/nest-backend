import { Test, TestingModule } from '@nestjs/testing';
import { describe } from 'node:test';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { UserService } from './../src/user/user.service';
import { AuthService } from './../src/auth/auth.service';
import { CreateUserDto } from './../src/user/dto/create-user.dto';

describe('App e2e', () => {
  let app: INestApplication;
  let user: UserService;
  let auth: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({}));
    await app.init();
    //await app.listen(8000);

    user = app.get(UserService);
    auth = app.get(AuthService);
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const payload: CreateUserDto = {
      //id: 1,
      email: 'kennie@mail.com',
      gender: 'male',
      lname: 'lawal',
      fname: 'kennie',
      password: '12345678',
    };
    describe('SignUp', async () => {
      it('should sign up user', async () => {
        return request(app.getHttpServer())
          .post('/api/auth/signup')
          .send(payload)
          .expect(HttpStatus.CREATED);
      });
    });
    describe('SignIn', async () => {
      it('should find user', async () => {
        //await user.removeAll();
        await user.signUp(payload);

        expect((await user.findByEmail('kennie@mail.com')).fname).toBe(
          'kennie',
        );
      });
      it('should generate auth token', async () => {
        //await user.removeAll();
        await user.signUp(payload);

        expect(await auth.signIn(payload.email, payload.password)).toHaveLength(
          160,
        );
      });
      it('should sign in user', async () => {
        return await request(app.getHttpServer())
          .post('/api/auth/login')
          .send({ email: 'kennie@mail.com', password: '12345678' })
          .ok((res) => res.body);
      });
    });
  });

  describe('User', () => {
    describe('Find All users', () => {
      it('should return all users', async () => {
        const list = await user.find();
        expect(list.length).toBeGreaterThan(0);
        expect(list[0].gender).toEqual('male');
        expect(list[0].fname).toEqual('kennie');

        return;
      });
    });
  });
});
