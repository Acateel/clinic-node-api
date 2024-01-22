import { UserRole } from '../../database/entity/user-entity'
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'

export class CreateUserDto {
  @IsOptional()
  @IsEmail()
  public readonly email: string

  @IsOptional()
  @Length(4, 15)
  @IsMobilePhone()
  public readonly phoneNumber: string

  @IsString()
  public readonly password: string

  @IsEnum(UserRole)
  public readonly role: UserRole

  constructor(
    email: string,
    phoneNumber: string,
    password: string,
    role: UserRole
  ) {
    this.email = email
    this.phoneNumber = phoneNumber
    this.password = password
    this.role = role
  }
}
