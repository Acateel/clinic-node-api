import { IsDate, IsNumber } from 'class-validator'

export class CreateDoctorScheduleDto {
  @IsNumber()
  public readonly doctorId: number

  @IsDate()
  public readonly startTime: Date

  @IsDate()
  public readonly endTime: Date

  constructor(doctorId: number, startTime: Date, endTime: Date) {
    this.doctorId = doctorId
    this.startTime = startTime
    this.endTime = endTime
  }
}
