import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { UserEntity } from './user-entity'

@Entity()
export class AuthcodeEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  code: string

  @ManyToOne(() => UserEntity, (user) => user.Authcodes, {
    onDelete: 'CASCADE',
  })
  user: UserEntity

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
