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

  @Column({ type: 'timestamptz' })
  startTime: Date

  @Column({ type: 'timestamptz' })
  endTime: Date

  @ManyToOne(() => PatientEntity, (patient) => patient.appointments, {
    onDelete: 'CASCADE',
  })
  patient: PatientEntity

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.appointments, {
    onDelete: 'CASCADE',
  })
  doctor: DoctorEntity

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
