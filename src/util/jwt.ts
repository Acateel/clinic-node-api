import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserEntity } from '../database/entity/user-entity'
dotenv.config()

const secretKey = process.env.JWT_SECRET

export async function getToken(user: UserEntity) {
  const token = jwt.sign({ userId: user.id, userRole: user.role }, secretKey, {
    expiresIn: '1h',
  })
  return token
}
