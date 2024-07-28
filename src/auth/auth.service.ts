import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService, //@Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async signUp(signUpDto: CreateUserDto): Promise<any> {
    // (await this.cacheManager.store.keys()).map((key) =>
    //   this.cacheManager.del(key),
    // );
    const registeredUser: User = await this.userService.create(signUpDto);

    const access_token = await this.generateToken(registeredUser);
    return { access_token, registeredUser };
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    const unhashedPass = await bcrypt.compare(pass, user?.password);
    if (!unhashedPass) {
      throw new UnauthorizedException('Wrong password');
    }
    const token = await this.generateToken(user);
    //await this.cacheManager.set('logged in user', user);

    return { token, user };
  }

  async generateToken(user: User) {
    const payload = { sub: user.id, name: user.fname };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '5m',
    });
    return access_token;
  }
}
