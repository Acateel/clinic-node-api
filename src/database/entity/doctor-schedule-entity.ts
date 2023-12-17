import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { DoctorEntity } from './doctor-entity'

@Entity()
export class DoctorScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  startTime: Date

  @Column()
  endTime: Date

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.appointments, {
    onDelete: 'CASCADE',
  })
  doctor: DoctorEntity

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
