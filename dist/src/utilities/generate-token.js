"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenService = void 0;
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AuthTokenService = class AuthTokenService {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async generateToken(user) {
        const payload = {
            sub: user.id,
            name: user.email,
        };
        try {
            const access_token = this.jwtService.sign(payload, {
                expiresIn: this.configService.get('DEV_JWT_TOKEN_EXPIRATION'),
                secret: process.env.NODE_ENV === 'development'
                    ? this.configService.get('DEV_JWT_SECRET')
                    : this.configService.get('PROD_JWT_SECRET'),
            });
            return access_token;
        }
        catch (error) {
            console.log('Error generating access_token', error);
            throw new common_1.InternalServerErrorException('Oops! Something went wrong.');
        }
    }
};
AuthTokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], AuthTokenService);
exports.AuthTokenService = AuthTokenService;
//# sourceMappingURL=generate-token.js.map