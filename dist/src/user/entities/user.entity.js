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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const create_user_dto_1 = require("../dto/create-user.dto");
const post_entity_1 = require("../../blogging/entities/post.entity");
const comment_entity_1 = require("../../blogging/entities/comment.entity");
let User = class User {
    async hashPassword() {
        try {
            if (this.password) {
                console.log('Hashing password: ', this.password);
                const hashed = (this.password = await bcrypt.hash(this.password, 10));
                console.log('Hashed: ', hashed);
            }
        }
        catch (error) {
            console.log('Hashing error: ', error);
        }
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, fname: { required: true, type: () => String }, lname: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, gender: { required: true, type: () => String }, role: { required: true, type: () => String }, access_token: { required: true, type: () => String }, profilePicture: { required: true, type: () => String }, posts: { required: true, type: () => [require("../../blogging/entities/post.entity").Post] }, comments: { required: true, type: () => [require("../../blogging/entities/comment.entity").Comment] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "fname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lname", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: create_user_dto_1.UserGender }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: create_user_dto_1.Roles, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "access_token", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "profilePicture", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_entity_1.Post, (post) => post.author),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.author),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map