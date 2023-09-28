import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhoneNumber1695905674222 implements MigrationInterface {
    name = 'AddPhoneNumber1695905674222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "patient_entity"
            ADD "phoneNumber" character varying(15)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "patient_entity" DROP COLUMN "phoneNumber"
        `);
    }

}
