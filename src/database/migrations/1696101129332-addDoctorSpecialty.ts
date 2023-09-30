import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDoctorSpecialty1696101129332 implements MigrationInterface {
    name = 'AddDoctorSpecialty1696101129332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "doctor_entity"
            ADD "specialty" character varying NOT NULL DEFAULT 'general'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "doctor_entity" DROP COLUMN "specialty"
        `);
    }

}
