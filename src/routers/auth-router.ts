import express from 'express'
import StatusCode from 'status-code-enum'
import { authService } from '../services/auth-service'
import { CreateUserDto } from '../dto/user/create-user-dto'
import { SigninUserDto } from '../dto/user/signin-user-dto'
import { LoginUserDto } from '../dto/user/login-user-dto'

export const authRouter = express.Router()

// sign up
authRouter.post('/signup', async (req, res, next) => {
  try {
    const { email, phoneNumber, password, role } = req.body

    await authService.signup(
      new CreateUserDto(email, phoneNumber, password, role)
    )

    const token = await authService.signin(
      new SigninUserDto(email ?? phoneNumber, password)
    )

    res.status(StatusCode.SuccessOK).json(token)
  } catch (error) {
    next(error)
  }
})

// sign in
authRouter.post('/signin', async (req, res, next) => {
  try {
    const { login, password } = req.body

    const token = await authService.signin(new SigninUserDto(login, password))

    res.status(StatusCode.SuccessOK).json(token)
  } catch (error) {
    next(error)
  }
})

// sign without password
authRouter.post('/login', async (req, res, next) => {
  try {
    const { email, phoneNumber, code, role } = req.body

    const result = await authService.login(
      new LoginUserDto(email, phoneNumber, code, role)
    )

    res.status(StatusCode.SuccessOK).json(result)
  } catch (error) {
    next(error)
  }
})
