import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFileColumnToPostEntity1726397798161
  implements MigrationInterface
{
  name?: string = 'AddFileColumnToPostEntity1726397798161';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" ADD COLUMN "file" VARCHAR`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" ADD COLUMN "file"`);
  }
}
