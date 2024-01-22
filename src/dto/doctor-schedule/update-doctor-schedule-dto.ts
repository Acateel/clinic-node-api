import { IsNumber } from 'class-validator'
import { CreateDoctorScheduleDto } from './create-doctor-schedule-dto'

export class UpdateDoctorScheduleDto extends CreateDoctorScheduleDto {
  @IsNumber()
  public readonly id: number

  constructor(id: number, doctorId: number, startTime: Date, endTime: Date) {
    super(doctorId, startTime, endTime)
    this.id = id
  }
}
