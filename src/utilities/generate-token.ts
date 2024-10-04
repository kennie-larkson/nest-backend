import { CreatedUser } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GenerateTokenDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async generateToken(user: GenerateTokenDto): Promise<string> {
    const payload = {
      sub: user.id,
      name: user.email,
    };

    try {
      const access_token = this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('DEV_JWT_TOKEN_EXPIRATION'),
      });
      return access_token;
    } catch (error) {
      console.log('Error generating access_token', error);

      throw new InternalServerErrorException('Oops! Something went wrong.');
    }
  }
}
