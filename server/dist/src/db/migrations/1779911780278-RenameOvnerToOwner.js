"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenameOvnerToOwner1779911780278 = void 0;
class RenameOvnerToOwner1779911780278 {
    name = 'RenameOvnerToOwner1779911780278';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_40772c5d226f76ccb527aa7cdb9"`);
        await queryRunner.query(`ALTER TABLE "events" RENAME COLUMN "ovnerId" TO "ownerId"`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_72bbe49600962f125177d7d6b68" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_72bbe49600962f125177d7d6b68"`);
        await queryRunner.query(`ALTER TABLE "events" RENAME COLUMN "ownerId" TO "ovnerId"`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_40772c5d226f76ccb527aa7cdb9" FOREIGN KEY ("ovnerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.RenameOvnerToOwner1779911780278 = RenameOvnerToOwner1779911780278;
