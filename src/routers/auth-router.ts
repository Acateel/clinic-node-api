import express from 'express'
import { authService } from '../services/auth-service'
import { UserRole } from '../database/entity/user-entity'
import StatusCode from 'status-code-enum'
import { PasswordMatchMIddleware } from '../middlewares/password-match-middleware'
import { LoginExistMiddleware } from '../middlewares/login-exist-middleware'
import { SignupMiddleware } from '../middlewares/signup-middleware'
import { SignMiddleware } from '../middlewares/sign-middleware'

export const authRouter = express.Router()

// sign up
authRouter.post(
  '/signup',
  SignupMiddleware,
  PasswordMatchMIddleware,
  async (req, res, next) => {
    try {
      const { email, phoneNumber, password, role } = req.body

      await authService.signup(email, phoneNumber, password, role as UserRole)

      const token = await authService.signin(email ?? phoneNumber, password)

      res.status(StatusCode.SuccessOK).json(token)
    } catch (error) {
      next(error)
    }
  }
)

// sign in
authRouter.post(
  '/signin',
  LoginExistMiddleware,
  PasswordMatchMIddleware,
  async (req, res, next) => {
    try {
      const { login, password } = req.body

      const token = await authService.signin(login, password)

      res.status(StatusCode.SuccessOK).json(token)
    } catch (error) {
      next(error)
    }
  }
)

// sign without password
authRouter.post('/sign', SignMiddleware, async (req, res, next) => {
  try {
    const { email, phoneNumber, code } = req.body

    if (email) {
      const result = await authService.signByEmail(email, code)
      res.status(StatusCode.SuccessOK).json(result)
    }

    if (phoneNumber) {
      const result = await authService.signByPhoneNumber(phoneNumber, code)
      res.status(StatusCode.SuccessOK).json(result)
    }
  } catch (error) {
    next(error)
  }
})
