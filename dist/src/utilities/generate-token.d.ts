import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GenerateTokenDto } from 'src/user/dto/create-user.dto';
export declare class AuthTokenService {
    private readonly jwtService;
    private configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    generateToken(user: GenerateTokenDto): Promise<string>;
}
