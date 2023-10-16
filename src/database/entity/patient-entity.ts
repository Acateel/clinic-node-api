import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { AppointmentEntity } from './appointment-entity'

@Entity()
export class PatientEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({
    nullable: true,
    length: 15,
  })
  phoneNumber: string

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.patient, {
    cascade: true,
  })
  appointments: AppointmentEntity[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
