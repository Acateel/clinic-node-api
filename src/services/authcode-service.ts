import { MoreThanOrEqual } from 'typeorm'
import { hash } from 'bcrypt'
import dotenv from 'dotenv'

import { dataSourse } from '../database/data-sourse'
import { AuthcodeEntity } from '../database/entity/authcode-entity'
import { UserEntity } from '../database/entity/user-entity'

dotenv.config()
const bcryptSalt: string = process.env.BCRYPT_SALT

class AuthcodeService {
  async getByUser(user: UserEntity) {
    const authcodeRepo = dataSourse.getRepository(AuthcodeEntity)

    const delayInMinutes = 15
    const date = new Date()
    date.setMinutes(date.getMinutes() - delayInMinutes)

    const authcodes = await authcodeRepo.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: user.id,
        },
        createdAt: MoreThanOrEqual(date),
      },
    })

    return authcodes
  }

  async create(user: UserEntity, code: string) {
    const authcodeRepo = dataSourse.getRepository(AuthcodeEntity)

    const authcode = new AuthcodeEntity()
    authcode.user = user
    authcode.code = await hash(code, bcryptSalt)

    const result = await authcodeRepo.save(authcode)

    return result
  }

  async deleteByUser(user: UserEntity) {
    const authcodeRepo = dataSourse.getRepository(AuthcodeEntity)

    const result = await authcodeRepo.delete({ user })

    return result
  }
}

export const authcodeService = new AuthcodeService()
