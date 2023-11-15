import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDoctorScheduleEntity1698258304478 implements MigrationInterface {
    name = 'AddDoctorScheduleEntity1698258304478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "doctor_schedule_entity" (
                "id" SERIAL NOT NULL,
                "startTime" TIMESTAMP NOT NULL,
                "endTime" TIMESTAMP NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "doctorId" integer,
                CONSTRAINT "PK_89fe6d3b940dfde901f1ab67701" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_schedule_entity"
            ADD CONSTRAINT "FK_b28d2e0641af95dd6d508367fcc" FOREIGN KEY ("doctorId") REFERENCES "doctor_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "doctor_schedule_entity" DROP CONSTRAINT "FK_b28d2e0641af95dd6d508367fcc"
        `);
        await queryRunner.query(`
            DROP TABLE "doctor_schedule_entity"
        `);
    }

}
