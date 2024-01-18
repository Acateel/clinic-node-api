import { UserRole } from '../../database/entity/user-entity'
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'

export class LoginUserDto {
  @IsOptional()
  @IsEmail()
  public readonly email: string

  @IsOptional()
  @Length(4, 15)
  @IsMobilePhone()
  public readonly phoneNumber: string

  @IsOptional()
  @IsString()
  public readonly code: string

  @IsOptional()
  @IsEnum(UserRole)
  public readonly role: UserRole

  constructor(
    email: string,
    phoneNumber: string,
    code: string,
    role: UserRole
  ) {
    this.email = email
    this.phoneNumber = phoneNumber
    this.code = code
    this.role = role
  }
}
