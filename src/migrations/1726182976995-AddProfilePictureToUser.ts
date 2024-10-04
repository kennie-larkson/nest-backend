import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProfilePictureToUser1726182976995
  implements MigrationInterface
{
  name = 'AddProfilePictureToUser1726182976995';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN "profilePicture" VARCHAR`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profilePicture"`);
  }
}
