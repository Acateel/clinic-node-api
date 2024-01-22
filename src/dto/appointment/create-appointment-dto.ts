import { IsDate, IsNumber, MinDate } from 'class-validator'

export class CreateAppointmentDto {
  @IsNumber()
  public readonly patientId: number

  @IsNumber()
  public readonly doctorId: number

  @IsDate()
  public readonly startTime: Date

  @IsDate()
  public readonly endTime: Date

  constructor(
    patientId: number,
    doctorId: number,
    startTime: Date,
    endTime: Date
  ) {
    this.patientId = patientId
    this.doctorId = doctorId
    this.startTime = startTime
    this.endTime = endTime
  }
}
