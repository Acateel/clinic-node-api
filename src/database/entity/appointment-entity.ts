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
  startTime: String

  @Column()
  endTime: String

  @ManyToOne(() => PatientEntity, (patient) => patient.appointments)
  patient: PatientEntity

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.appointments)
  doctor: DoctorEntity

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
