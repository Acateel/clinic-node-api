import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { AppointmentEntity } from './appointment-entity'
import { DoctorScheduleEntity } from './doctor-schedule-entity'

@Entity()
export class DoctorEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({
    default: 'general',
  })
  specialty: string

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.doctor, {
    cascade: ['remove'],
  })
  appointments: AppointmentEntity[]

  @OneToMany(
    () => DoctorScheduleEntity,
    (doctorSchedule) => doctorSchedule.doctor,
    {
      cascade: ['remove'],
    }
  )
  schedule: DoctorScheduleEntity[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
