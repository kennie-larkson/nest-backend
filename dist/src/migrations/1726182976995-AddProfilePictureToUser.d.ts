import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddProfilePictureToUser1726182976995 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
