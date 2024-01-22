import { IsString } from 'class-validator'

export class SigninUserDto {
  @IsString()
  public readonly login: string

  @IsString()
  public readonly password: string

  constructor(login: string, password: string) {
    this.login = login
    this.password = password
  }
}
