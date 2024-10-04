import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddFileColumnToPostEntity1726397798161 implements MigrationInterface {
    name?: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
