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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloggingController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const blogging_service_1 = require("./blogging.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const user_entity_1 = require("../user/entities/user.entity");
const getuser_decorator_1 = require("../auth/decorators/getuser.decorator");
const auth_guard_1 = require("../auth/auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
let BloggingController = class BloggingController {
    constructor(bloggingService) {
        this.bloggingService = bloggingService;
    }
    create(createPostDto, file, author) {
        return this.bloggingService.createPost(createPostDto, author, file);
    }
    getPosts() {
        return this.bloggingService.getPosts();
    }
    findOne(id) {
        return this.bloggingService.getPost(id);
    }
    findPostByAuthor(id) {
        return this.bloggingService.getPostByAuthor(id);
    }
    createComment(postId, createCommenDto, author) {
        return this.bloggingService.createComment(createCommenDto, author, postId);
    }
};
__decorate([
    (0, common_1.Post)('posts'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    openapi.ApiResponse({ status: 201, type: require("./entities/post.entity").Post }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, getuser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto, Object, Object]),
    __metadata("design:returntype", void 0)
], BloggingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('posts'),
    openapi.ApiResponse({ status: 200, type: [require("./entities/post.entity").Post] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BloggingController.prototype, "getPosts", null);
__decorate([
    (0, common_1.Get)('posts/:id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/post.entity").Post }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BloggingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('posts/author/:id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/post.entity").Post }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BloggingController.prototype, "findPostByAuthor", null);
__decorate([
    (0, common_1.Post)('posts/:id/comments'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 201, type: require("./entities/comment.entity").Comment }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, getuser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_post_dto_1.CreateCommentDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], BloggingController.prototype, "createComment", null);
BloggingController = __decorate([
    (0, common_1.Controller)('blogging'),
    __metadata("design:paramtypes", [blogging_service_1.BloggingService])
], BloggingController);
exports.BloggingController = BloggingController;
//# sourceMappingURL=blogging.controller.js.map