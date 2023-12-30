import createHttpError from 'http-errors'
import { dataSourse } from '../database/data-sourse'
import { UserEntity, UserRole } from '../database/entity/user-entity'
import * as argon from 'argon2'
import StatusCode from 'status-code-enum'
import { getToken } from '../util/jwt'
import { userService } from './user-service'

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
}

export const authService = new AuthService()
