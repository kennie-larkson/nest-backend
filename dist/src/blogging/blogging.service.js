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
exports.BloggingService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../user/entities/user.entity");
const post_entity_1 = require("./entities/post.entity");
const comment_entity_1 = require("./entities/comment.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const error_handling_1 = require("../error-handling/error-handling");
const file_upload_service_1 = require("../file-hosting/file-upload.service");
let BloggingService = class BloggingService {
    constructor(postRepository, commentRepository, userRepository, fileUploadService) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.fileUploadService = fileUploadService;
        this.fileUploadService.config();
    }
    async createPost(createPostDto, user, file) {
        try {
            const author = await this.userRepository.findOne({
                where: { id: user.id },
            });
            if (!author)
                throw new error_handling_1.UserNotFoundException(user.email);
            let fileUrl;
            if (file !== null || file !== undefined) {
                const fileName = await this.fileUploadService.fileNameGenerator(file);
                fileUrl = await this.fileUploadService.fileUploader(fileName);
            }
            const post = this.postRepository.create(Object.assign(Object.assign({}, createPostDto), { author }));
            post.file = fileUrl.url;
            await this.postRepository.save(post);
            post.author.access_token = null;
            return post;
        }
        catch (error) {
            throw error;
        }
    }
    async getPost(id) {
        return this.postRepository.findOne({
            where: { id },
            relations: ['comments'],
        });
    }
    async getPostByAuthor(id) {
        return this.postRepository.findOne({ where: { author: { id } } });
    }
    async getPosts() {
        return this.postRepository.find({ relations: ['comments'] });
    }
    async createComment(createCommenDto, author, postId) {
        const post = await this.postRepository.findOne({ where: { id: postId } });
        const comment = this.commentRepository.create(Object.assign(Object.assign({}, createCommenDto), { post,
            author }));
        return this.commentRepository.save(comment);
    }
};
BloggingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        file_upload_service_1.FileUploadService])
], BloggingService);
exports.BloggingService = BloggingService;
//# sourceMappingURL=blogging.service.js.map