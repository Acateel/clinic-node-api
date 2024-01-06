import createHttpError from 'http-errors'
import { dataSourse } from '../database/data-sourse'
import { UserEntity, UserRole } from '../database/entity/user-entity'
import * as argon from 'argon2'
import StatusCode from 'status-code-enum'
import { getToken } from '../util/jwt'
import { userService } from './user-service'
import { generateCode } from '../util/generate-code'
import { authcodeService } from './authcode-service'
import { sendAuthCodeByEmail } from '../util/email-sender'
import { AuthcodeEntity } from '../database/entity/authcode-entity'
import { sendAuthCodeBySMS } from '../util/sms-sender'
import { generatePassword } from '../util/password-generator'

class AuthService {
  async signup(
    email: string,
    phoneNumber: string,
    password: string,
    role: UserRole
  ) {
    if (!email && !phoneNumber) {
      throw createHttpError(
        StatusCode.ClientErrorNotFound,
        'Credentials incorrect, need email or phone number for signup'
      )
    }

    await this.checkUserExist(email, phoneNumber)

    const userRepo = dataSourse.getRepository(UserEntity)

    const user = new UserEntity()
    user.email = email
    user.phoneNumber = phoneNumber
    user.password = await argon.hash(password)
    user.role = role

    const result = await userRepo.save(user)

    return result
  }

  async signin(login: string, password: string) {
    const user =
      (await userService.getByEmail(login)) ??
      (await userService.getByPhoneNumber(login))

    if (!user) {
      throw createHttpError(
        StatusCode.ClientErrorNotFound,
        'Credentials incorrect'
      )
    }

    const pwMatches = await argon.verify(user.password, password)
    if (!pwMatches) {
      throw createHttpError(
        StatusCode.ClientErrorForbidden,
        'Credentials incorrect'
      )
    }

    return getToken(user)
  }

  async sign(email: string, phoneNumber: string, code: string, role: UserRole) {
    let user

    if (email) {
      user = await userService.getByEmail(email)
    }

    if (phoneNumber) {
      user = await userService.getByPhoneNumber(phoneNumber)
    }

    if (!user) {
      user = await this.signup(email, phoneNumber, generatePassword(), role)
    }

    if (!code) {
      const generatedCode = generateCode()

      // save code
      await authcodeService.create(user, generatedCode)

      // send code
      if (email) {
        await sendAuthCodeByEmail(generatedCode, email)
      }

      if (phoneNumber) {
        await sendAuthCodeBySMS(phoneNumber, generatedCode)
      }

      return { message: 'code sended' }
    }

    const token = await this.getUserTokenByCode(user, code)

    return token
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
      if (await argon.verify(authcodes[i].code, code)) {
        return true
      }
    }
    return false
  }
}

export const authService = new AuthService()
