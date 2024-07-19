import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1721159020322 implements MigrationInterface {
    name = 'InitialMigration1721159020322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "car" ("created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP DEFAULT now(), "deleted_date" TIMESTAMP, "id" SERIAL NOT NULL, "model" character varying NOT NULL, "year" character varying NOT NULL, "rentPerDay" character varying NOT NULL, "manufacture" character varying, "capacity" integer NOT NULL, "transmission" character varying NOT NULL, "withDriver" boolean NOT NULL, "image" character varying NOT NULL, "startRent" TIMESTAMP NOT NULL, "endRent" TIMESTAMP NOT NULL, "description" text, "creatorId" integer, "updaterId" integer, "deleterId" integer, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP DEFAULT now(), "deleted_date" TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "refreshToken" text, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_5d87b6060c838e4ea2a1379b689" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_9fdfc1baf5828cb34934646ae21" FOREIGN KEY ("updaterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_673049ab63fa6f69bc48480c40d" FOREIGN KEY ("deleterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_673049ab63fa6f69bc48480c40d"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_9fdfc1baf5828cb34934646ae21"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_5d87b6060c838e4ea2a1379b689"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "car"`);
    }

}
