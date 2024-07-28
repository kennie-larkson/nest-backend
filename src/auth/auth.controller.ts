import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { NoAuthNeeded } from './decorators/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiBearerAuth() // this decorator specifies the Bearer Authentication security mechanism for the API documentation
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //@UseInterceptors(CacheInterceptor)
  @NoAuthNeeded()
  @Post('signup')
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }
  @HttpCode(HttpStatus.OK)
  @NoAuthNeeded()
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
  @Get('profile')
  getProfile(@Request() req) {
    return `Congratulations ${req.user.name}. You have accessed a protected route.`;
  }
}
