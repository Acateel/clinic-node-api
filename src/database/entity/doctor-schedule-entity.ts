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

  @Column({ type: 'timestamptz' })
  startTime: Date

  @Column({ type: 'timestamptz' })
  endTime: Date

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.appointments, {
    onDelete: 'CASCADE',
  })
  doctor: DoctorEntity

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
