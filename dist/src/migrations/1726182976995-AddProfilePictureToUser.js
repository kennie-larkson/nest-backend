"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProfilePictureToUser1726182976995 = void 0;
class AddProfilePictureToUser1726182976995 {
    constructor() {
        this.name = 'AddProfilePictureToUser1726182976995';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD COLUMN "profilePicture" VARCHAR`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profilePicture"`);
    }
}
exports.AddProfilePictureToUser1726182976995 = AddProfilePictureToUser1726182976995;
//# sourceMappingURL=1726182976995-AddProfilePictureToUser.js.map