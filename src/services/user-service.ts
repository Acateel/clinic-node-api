import { dataSourse } from '../database/data-sourse'
import { UserEntity } from '../database/entity/user-entity'

class UserService {
  async get() {
    const userRepo = dataSourse.getRepository(UserEntity)
    const users = await userRepo.find()

    const usersWithoutPassword = users.map((user) => {
      delete user.password
      return user
    })

    return usersWithoutPassword
  }

  async getById(id: number) {
    const userRepo = dataSourse.getRepository(UserEntity)
    const user = await userRepo.findOneBy({
      id,
    })

    delete user.password

    return user
  }

  async getByEmail(email: string) {
    const userRepo = dataSourse.getRepository(UserEntity)

    const user = await userRepo.findOneBy({ email })

    return user
  }

  async getByPhoneNumber(phoneNumber: string) {
    const userRepo = dataSourse.getRepository(UserEntity)

    const user = await userRepo.findOneBy({ phoneNumber })

    return user
  }

  async delete(id: number) {
    const userRepo = dataSourse.getRepository(UserEntity)
    const result = await userRepo.delete(id)

    return result
  }
}

export const userService = new UserService()
