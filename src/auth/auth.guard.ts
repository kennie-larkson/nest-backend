import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { ConfigService } from '@nestjs/config';
import {
  AuthenticationTokenRequiredException,
  WrongAuthenticationTokenException,
} from '../error-handling/error-handling';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  jwtSecret =
    process.env.NODE_ENV === 'development'
      ? this.configService.get<string>('DEV_JWT_SECRET')
      : this.configService.get<string>('PROD_JWT_SECRET');

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    try {
      if (!token) {
        throw new AuthenticationTokenRequiredException();
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecret,
      });

      if (!payload) {
        throw new WrongAuthenticationTokenException();
      }

      request['user'] = payload;
    } catch (error) {
      if (error.name == 'TokenExpiredError') {
        throw new UnauthorizedException(
          'Kindly login as your session has expired.',
        );
      }

      throw error;
    }
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
