import { Entity, Column, OneToMany } from 'typeorm'
import { BaseEntity } from './base-entity'
import { Appointment } from './appointment.entity'

@Entity()
export class Doctor extends BaseEntity {
  @Column()
  firstName: string

  @Column()
  lastName: string

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[]
}
