import express from 'express'
import { userService } from '../services/user-service'
import { FormatPhoneNumberMiddleware } from '../middlewares/phone-number-format-middleware'
import StatusCode from 'status-code-enum'

export const userRouter = express.Router()

// Get
userRouter.get('/', async (req, res, next) => {
  try {
    const users = await userService.get()
    res.status(StatusCode.SuccessOK).json(users)
  } catch (error) {
    next(error)
  }
})

// Get by id
userRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await userService.getById(+req.params.id)
    res.status(StatusCode.SuccessOK).json(user)
  } catch (error) {
    next(error)
  }
})

// Delete
userRouter.delete('/:id', async (req, res, next) => {
  try {
    const user = await userService.delete(+req.params.id)
    res.status(StatusCode.SuccessOK).json(user)
  } catch (error) {
    next(error)
  }
})
