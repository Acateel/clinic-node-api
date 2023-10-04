import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeAppointmentTimesType1696426660732 implements MigrationInterface {
    name = 'ChangeAppointmentTimesType1696426660732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "appointment_entity" DROP COLUMN "startTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
            ADD "startTime" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity" DROP COLUMN "endTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
            ADD "endTime" TIMESTAMP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "appointment_entity" DROP COLUMN "endTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
            ADD "endTime" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity" DROP COLUMN "startTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
            ADD "startTime" character varying NOT NULL
        `);
    }

}
