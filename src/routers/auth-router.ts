import express from 'express'
import { authService } from '../services/auth-service'
import { UserRole } from '../database/entity/user-entity'
import StatusCode from 'status-code-enum'

export const authRouter = express.Router()

// sign up
authRouter.post('/signup', async (req, res, next) => {
  try {
    const { email, phoneNumber, password, role } = req.body

    await authService.signup(email, phoneNumber, password, role as UserRole)

    const token = await authService.signin(email ?? phoneNumber, password)

    res.status(StatusCode.SuccessOK).json(token)
  } catch (error) {
    next(error)
  }
})

// sign in
authRouter.post('/signin', async (req, res, next) => {
  try {
    const { login, password } = req.body

    const token = await authService.signin(login, password)

    res.status(StatusCode.SuccessOK).json(token)
  } catch (error) {
    next(error)
  }
})
