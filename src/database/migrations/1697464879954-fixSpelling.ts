import { MigrationInterface, QueryRunner } from "typeorm";

export class FixSpelling1697464879954 implements MigrationInterface {
    name = 'FixSpelling1697464879954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "patient_entity"
                RENAME COLUMN "updateAt" TO "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_entity"
                RENAME COLUMN "updateAt" TO "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
                RENAME COLUMN "updateAt" TO "updatedAt"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
                RENAME COLUMN "updatedAt" TO "updateAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_entity"
                RENAME COLUMN "updatedAt" TO "updateAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "patient_entity"
                RENAME COLUMN "updatedAt" TO "updateAt"
        `);
    }

}
