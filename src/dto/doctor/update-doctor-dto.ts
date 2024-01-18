import { IsNumber } from 'class-validator'
import { CreateDoctorDto } from './create-doctor-dto'

export class UpdateDoctorDto extends CreateDoctorDto {
  @IsNumber()
  public readonly id: number

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    specialty: string
  ) {
    super(firstName, lastName, specialty)
    this.id = id
  }
}
