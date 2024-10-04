import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  CreatedUser,
  CreateUserDto,
  LoginResponse,
} from './../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { NoAuthNeeded } from './decorators/public.decorator';
import { SignInDto } from './dto/signin.dto';
import { UserService } from '../user/user.service';

@ApiBearerAuth() // this decorator specifies the Bearer Authentication security mechanism for the API documentation
@Controller('auth')
//@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    public service: UserService,
  ) {}

  @NoAuthNeeded()
  @Post('signup')
  async signup(@Body() dto: CreateUserDto): Promise<CreatedUser> {
    return this.service.signUp(dto);
  }

  @NoAuthNeeded()
  @Post('login')
  async login(@Body() dto: SignInDto): Promise<LoginResponse> {
    return this.authService.signIn(dto.email, dto.password);
  }
}
