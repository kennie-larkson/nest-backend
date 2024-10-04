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
exports.CreateUserDto = exports.Roles = exports.UserGender = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var UserGender;
(function (UserGender) {
    UserGender["MALE"] = "MALE";
    UserGender["FEMALE"] = "FEMALE";
    UserGender["male"] = "male";
    UserGender["female"] = "female";
})(UserGender = exports.UserGender || (exports.UserGender = {}));
var Roles;
(function (Roles) {
    Roles["ADMIN"] = "ADMIN";
    Roles["GUEST"] = "GUEST";
})(Roles = exports.Roles || (exports.Roles = {}));
class CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { fname: { required: true, type: () => String }, lname: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, gender: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'This is the first name property of the user to be created.',
        example: 'kennie',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "fname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'This is the last name property of the user to be created.',
        example: 'kennie',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'This is the email for the user to be created.',
        uniqueItems: true,
        example: 'kennie@email.com',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'This is the password for the user to be created.',
        minimum: 8,
        required: true,
        example: '12345678',
    }),
    (0, class_validator_1.IsNotEmpty)({}),
    (0, class_validator_1.Length)(8),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(UserGender),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "gender", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map