import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { AuthcodeEntity } from './authcode-entity'

export enum UserRole {
  Doctor = 'doctor',
  Patient = 'patient',
  Admin = 'admin',
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: true,
    unique: true,
  })
  email: string

  @Column({
    nullable: true,
    length: 15,
    unique: true,
  })
  phoneNumber: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.Patient,
  })
  role: UserRole

  @OneToMany(() => AuthcodeEntity, (authcode) => authcode.user, {
    cascade: ['remove'],
  })
  Authcodes: AuthcodeEntity[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
