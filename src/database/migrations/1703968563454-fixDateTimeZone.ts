import { MigrationInterface, QueryRunner } from "typeorm";

export class FixDateTimeZone1703968563454 implements MigrationInterface {
    name = 'FixDateTimeZone1703968563454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_entity" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_entity"
            ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "user_entity" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_entity"
            ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "authcode_entity" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "authcode_entity"
            ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "authcode_entity" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "authcode_entity"
            ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "patient_entity" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "patient_entity"
            ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "patient_entity" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "patient_entity"
            ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_schedule_entity" DROP COLUMN "startTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_schedule_entity"
            ADD "startTime" TIMESTAMP WITH TIME ZONE NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_schedule_entity" DROP COLUMN "endTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_schedule_entity"
            ADD "endTime" TIMESTAMP WITH TIME ZONE NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_schedule_entity" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_schedule_entity"
            ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_schedule_entity" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_schedule_entity"
            ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_entity" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_entity"
            ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_entity" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_entity"
            ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity" DROP COLUMN "startTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
            ADD "startTime" TIMESTAMP WITH TIME ZONE NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity" DROP COLUMN "endTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
            ADD "endTime" TIMESTAMP WITH TIME ZONE NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
            ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
            ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "appointment_entity" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity" DROP COLUMN "endTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
            ADD "endTime" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity" DROP COLUMN "startTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
            ADD "startTime" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_entity" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_entity"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_entity" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_entity"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_schedule_entity" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_schedule_entity"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_schedule_entity" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_schedule_entity"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_schedule_entity" DROP COLUMN "endTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_schedule_entity"
            ADD "endTime" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_schedule_entity" DROP COLUMN "startTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_schedule_entity"
            ADD "startTime" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "patient_entity" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "patient_entity"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "patient_entity" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "patient_entity"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "authcode_entity" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "authcode_entity"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "authcode_entity" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "authcode_entity"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "user_entity" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_entity"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "user_entity" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_entity"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
    }

}
