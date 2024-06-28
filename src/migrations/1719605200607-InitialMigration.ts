import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1719605200607 implements MigrationInterface {
    name = 'InitialMigration1719605200607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" ADD "type" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "type"`);
    }

}
