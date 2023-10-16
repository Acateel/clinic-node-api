import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { PatientEntity } from './patient-entity'
import { DoctorEntity } from './doctor-entity'

@Entity()
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  startTime: Date

  @Column()
  endTime: Date

  @ManyToOne(() => PatientEntity, (patient) => patient.appointments, {
    onDelete: 'CASCADE',
  })
  patient: PatientEntity

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.appointments, {
    onDelete: 'CASCADE',
  })
  doctor: DoctorEntity

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
