import {
  IsString,
  Length,
  IsMobilePhone,
  IsOptional,
} from 'class-validator'
export class CreatePatientDto {
  @IsString()
  public readonly firstName: string

  @IsString()
  public readonly lastName: string

  @IsOptional()
  @Length(4, 15)
  @IsMobilePhone()
  public readonly phoneNumber: string

  constructor(firstName: string, lastName: string, phoneNumber: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.phoneNumber = phoneNumber
  }
}
