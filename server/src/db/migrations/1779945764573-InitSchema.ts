import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1779945764573 implements MigrationInterface {
    name = 'InitSchema1779945764573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_participants" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "event_participants" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "event_participants" ALTER COLUMN "joinedDate" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_participants" ALTER COLUMN "joinedDate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "event_participants" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event_participants" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

}
