import { Entity, Column, ManyToOne } from 'typeorm'
import { Patient } from './patient.entity'
import { BaseEntity } from './base-entity'
import { Doctor } from './doctor.entity'

@Entity()
export class Appointment extends BaseEntity {
  @Column()
  time: Date

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  patient: Patient

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  doctor: Doctor
}
