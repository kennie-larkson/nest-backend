"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFileColumnToPostEntity1726397798161 = void 0;
class AddFileColumnToPostEntity1726397798161 {
    constructor() {
        this.name = 'AddFileColumnToPostEntity1726397798161';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "post" ADD COLUMN "file" VARCHAR`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "post" ADD COLUMN "file"`);
    }
}
exports.AddFileColumnToPostEntity1726397798161 = AddFileColumnToPostEntity1726397798161;
//# sourceMappingURL=1726397798161-AddFileColumnToPostEntity.js.map