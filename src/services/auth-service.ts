import createHttpError from 'http-errors'
import { hash, compare } from 'bcrypt'
import StatusCode from 'status-code-enum'
import dotenv from 'dotenv'

import { dataSourse } from '../database/data-sourse'
import { UserEntity } from '../database/entity/user-entity'
import { getToken } from '../util/jwt'
import { userService } from './user-service'
import { generateCode } from '../util/generate-code'
import { authcodeService } from './authcode-service'
import { sendAuthCodeByEmail } from '../util/email-sender'
import { AuthcodeEntity } from '../database/entity/authcode-entity'
import { sendAuthCodeBySMS } from '../util/sms-sender'
import { generatePassword } from '../util/password-generator'
import { validDto, validateDto } from '../util/validate-decorators'
import { CreateUserDto } from '../dto/user/create-user-dto'
import { SigninUserDto } from '../dto/user/signin-user-dto'
import { LoginUserDto } from '../dto/user/login-user-dto'
import { formatPhoneNumber } from '../util/format-phone-number'

dotenv.config()
const bcryptSalt: string = process.env.BCRYPT_SALT

class AuthService {
  @validateDto
  async signup(@validDto userDto: CreateUserDto) {
    if (!userDto.email && !userDto.phoneNumber) {
      throw createHttpError(
        StatusCode.ClientErrorNotFound,
        'Credentials incorrect, need email or phone number for signup'
      )
    }

    await this.checkUserExist(userDto.email, userDto.phoneNumber)

    const userRepo = dataSourse.getRepository(UserEntity)

    const user = new UserEntity()
    user.email = userDto.email
    user.phoneNumber = formatPhoneNumber(userDto.phoneNumber)
    user.password = await hash(userDto.password, bcryptSalt)
    user.role = userDto.role

    const result = await userRepo.save(user)

    return result
  }

  @validateDto
  async signin(@validDto userDto: SigninUserDto) {
    const user =
      (await userService.getByEmail(userDto.login)) ??
      (await userService.getByPhoneNumber(userDto.login))

    if (!user) {
      throw createHttpError(
        StatusCode.ClientErrorNotFound,
        'Credentials incorrect'
      )
    }

    const pwMatches = await compare(userDto.password, user.password)
    if (!pwMatches) {
      throw createHttpError(
        StatusCode.ClientErrorForbidden,
        'Credentials incorrect'
      )
    }

    const token = await getToken(user)

    return { accessToken: token }
  }

  @validateDto
  async login(@validDto userDto: LoginUserDto) {
    const { email, phoneNumber, code, role } = userDto

    if (!email && !phoneNumber) {
      throw createHttpError(
        StatusCode.ClientErrorBadRequest,
        'Dont have email or phone number'
      )
    }

    if (email && phoneNumber) {
      throw createHttpError(
        StatusCode.ClientErrorBadRequest,
        'Need select email or phone number'
      )
    }

    let user

    if (email) {
      user = await userService.getByEmail(email)
    }

    if (phoneNumber) {
      user = await userService.getByPhoneNumber(phoneNumber)
    }

    if (!user) {
      user = await this.signup(
        new CreateUserDto(email, phoneNumber, generatePassword(), role)
      )
    }

    if (!code) {
      const generatedCode = generateCode()

      // save code
      await authcodeService.create(user, generatedCode)

      // send code
      if (email) {
        sendAuthCodeByEmail(generatedCode, email)
      }

      if (phoneNumber) {
        sendAuthCodeBySMS(phoneNumber, generatedCode)
      }

      return { message: 'code sended' }
    }

    const token = await this.getUserTokenByCode(user, code)

    return { accessToken: token }
  }

  /**
   * Get Token if code verify and delete authcodes, else trrow error
   * @param user
   * @param code
   */
  async getUserTokenByCode(user: UserEntity, code: string) {
    //check code

    const authcodes = await authcodeService.getByUser(user)

    const verify = await this.checkCode(authcodes, code)

    if (!verify) {
      throw createHttpError(StatusCode.ClientErrorForbidden, 'Code dont match')
    }

    // delete auth codes
    await authcodeService.deleteByUser(user)

    return getToken(user)
  }

  async checkUserExist(email: string, phoneNumber: string) {
    if (email) {
      const user = await userService.getByEmail(email)

      if (user) {
        throw createHttpError(
          StatusCode.ClientErrorConflict,
          'User with this email exist'
        )
      }
    }

    if (phoneNumber) {
      const user = await userService.getByPhoneNumber(phoneNumber)

      if (user) {
        throw createHttpError(
          StatusCode.ClientErrorConflict,
          'User with this phoneNumber exist'
        )
      }
    }
  }

  async checkCode(authcodes: AuthcodeEntity[], code: string) {
    for (let i = 0; i < authcodes.length; i++) {
      if (await compare(code, authcodes[i].code)) {
        return true
      }
    }
    return false
  }
}

export const authService = new AuthService()
