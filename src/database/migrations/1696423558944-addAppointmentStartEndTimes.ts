import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAppointmentStartEndTimes1696423558944 implements MigrationInterface {
    name = 'AddAppointmentStartEndTimes1696423558944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "appointment_entity" DROP COLUMN "time"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
            ADD "startTime" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
            ADD "endTime" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "appointment_entity" DROP COLUMN "endTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity" DROP COLUMN "startTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
            ADD "time" TIMESTAMP NOT NULL
        `);
    }

}
