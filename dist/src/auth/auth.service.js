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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const generate_token_1 = require("../utilities/generate-token");
const error_handling_1 = require("../error-handling/error-handling");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AuthService = class AuthService {
    constructor(usersRepository, authToken) {
        this.usersRepository = usersRepository;
        this.authToken = authToken;
    }
    async signIn(email, password) {
        try {
            const user = await this.usersRepository.findOne({
                where: { email },
            });
            if (!user) {
                throw new error_handling_1.UserNotFoundException(email);
            }
            const verifySuccess = await bcrypt.compare(password, user === null || user === void 0 ? void 0 : user.password);
            if (!verifySuccess) {
                throw new error_handling_1.WrongAccountPasswordException(email);
            }
            const payload = { id: user.id, email };
            const { access_token: _ } = user, registeredUser = __rest(user, ["access_token"]);
            return {
                message: 'User signin successful',
                access_token: await this.authToken.generateToken(payload),
                registeredUser,
            };
        }
        catch (error) {
            console.error('Error during user login:', error);
            throw error;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        generate_token_1.AuthTokenService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map