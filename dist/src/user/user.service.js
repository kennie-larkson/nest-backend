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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const generate_token_1 = require("../utilities/generate-token");
const crud_typeorm_1 = require("@dataui/crud-typeorm");
const error_handling_1 = require("../error-handling/error-handling");
const file_upload_service_1 = require("../file-hosting/file-upload.service");
let UserService = class UserService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(userRepository, authToken, fileUploadService) {
        super(userRepository);
        this.userRepository = userRepository;
        this.authToken = authToken;
        this.fileUploadService = fileUploadService;
        this.fileUploadService.config();
    }
    async signUp(dto) {
        try {
            const existingUser = await this.userRepository.findOne({
                where: { email: dto.email },
            });
            if (existingUser) {
                throw new error_handling_1.UserAlreadyExistsException(existingUser.email);
            }
            const user = new user_entity_1.User();
            (user.access_token = ''),
                (user.email = dto.email),
                (user.fname = dto.fname),
                (user.gender = dto.gender),
                (user.lname = dto.lname),
                (user.password = dto.password);
            const savedUser = this.userRepository.create(user);
            const { id, email } = savedUser;
            const access_token = await this.authToken.generateToken({
                id,
                email,
            });
            savedUser.access_token = access_token;
            const _a = await this.userRepository.save(savedUser), { access_token: _ } = _a, registeredUser = __rest(_a, ["access_token"]);
            return {
                message: 'User registration successful.',
                access_token,
                registeredUser,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new error_handling_1.UserNotFoundException(user.email);
        }
        return user;
    }
    async uploadProfilePicture(userId, file) {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new error_handling_1.UserNotFoundException(userId);
            }
            const fileName = await this.fileUploadService.fileNameGenerator(file);
            const uploadResponse = await this.fileUploadService.fileUploader(fileName);
            user.profilePicture = uploadResponse.url;
            this.userRepository.save(user);
            return { 'profile-picture-url': user.profilePicture };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('File Upload Error', error.message);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        generate_token_1.AuthTokenService,
        file_upload_service_1.FileUploadService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map