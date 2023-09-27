import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Patient } from './patient.entity'
import { Doctor } from './doctor.entity'

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  time: Date

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  patient: Patient

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  doctor: Doctor

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
