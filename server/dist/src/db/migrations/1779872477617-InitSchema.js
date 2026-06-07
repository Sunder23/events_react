"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitSchema1779872477617 = void 0;
class InitSchema1779872477617 {
    name = 'InitSchema1779872477617';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updatedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" DROP DEFAULT`);
    }
}
exports.InitSchema1779872477617 = InitSchema1779872477617;
