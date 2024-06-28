"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1719605200607 = void 0;
class InitialMigration1719605200607 {
    constructor() {
        this.name = 'InitialMigration1719605200607';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "car" ADD "type" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "type"`);
    }
}
exports.InitialMigration1719605200607 = InitialMigration1719605200607;
