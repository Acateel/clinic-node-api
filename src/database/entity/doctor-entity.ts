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
    onDelete: 'CASCADE',
  })
  appointments: AppointmentEntity[]

  @OneToMany(
    () => DoctorScheduleEntity,
    (doctorSchedule) => doctorSchedule.doctor,
    {
      onDelete: 'CASCADE',
    }
  )
  schedule: DoctorScheduleEntity[]

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
