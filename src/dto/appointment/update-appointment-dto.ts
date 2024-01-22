import { IsDate, IsNumber, MinDate } from 'class-validator'

export class UpdateAppointmentDto {
  @IsNumber()
  public readonly appointmentId: number

  @IsNumber()
  public readonly doctorId: number

  @IsDate()
  public readonly startTime: Date

  @IsDate()
  public readonly endTime: Date

  constructor(
    appointmentId: number,
    doctorId: number,
    startTime: Date,
    endTime: Date
  ) {
    this.appointmentId = appointmentId
    this.doctorId = doctorId
    this.startTime = startTime
    this.endTime = endTime
  }
}
