"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloggingModule = void 0;
const common_1 = require("@nestjs/common");
const blogging_service_1 = require("./blogging.service");
const blogging_controller_1 = require("./blogging.controller");
const typeorm_1 = require("@nestjs/typeorm");
const post_entity_1 = require("./entities/post.entity");
const comment_entity_1 = require("./entities/comment.entity");
const user_module_1 = require("../user/user.module");
const file_upload_service_1 = require("../file-hosting/file-upload.service");
let BloggingModule = class BloggingModule {
};
BloggingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([post_entity_1.Post, comment_entity_1.Comment]), user_module_1.UserModule],
        controllers: [blogging_controller_1.BloggingController],
        providers: [blogging_service_1.BloggingService, file_upload_service_1.FileUploadService],
    })
], BloggingModule);
exports.BloggingModule = BloggingModule;
//# sourceMappingURL=blogging.module.js.map