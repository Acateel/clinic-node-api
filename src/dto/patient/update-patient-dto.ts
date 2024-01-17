import { IsNumber } from 'class-validator'
import { CreatePatientDto } from './create-patient-dto'

export class UpdatePatientDto extends CreatePatientDto {
  @IsNumber()
  public readonly id: number

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) {
    super(firstName, lastName, phoneNumber)
    this.id = id
  }
}
