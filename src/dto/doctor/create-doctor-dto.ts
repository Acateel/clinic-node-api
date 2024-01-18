import { IsOptional, IsString } from 'class-validator'

export class CreateDoctorDto {
  @IsString()
  public readonly firstName: string
  @IsString()
  public readonly lastName: string

  @IsOptional()
  @IsString()
  public readonly specialty: string

  constructor(firstName: string, lastName: string, specialty: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.specialty = specialty
  }
}
