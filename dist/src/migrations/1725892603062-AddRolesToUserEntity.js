"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRolesToUserEntity1725892603062 = void 0;
class AddRolesToUserEntity1725892603062 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD COLUMN "role" VARCHAR`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    }
}
exports.AddRolesToUserEntity1725892603062 = AddRolesToUserEntity1725892603062;
//# sourceMappingURL=1725892603062-AddRolesToUserEntity.js.map