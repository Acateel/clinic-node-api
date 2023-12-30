import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import StatusCode from 'status-code-enum'

export const PasswordMatchMIddleware: RequestHandler = (req, res, next) => {
  const { password } = req.body

  if (!password) {
    next(createHttpError(StatusCode.ClientErrorNotFound, 'Password not found'))
  }

  // add some rules for match password

  next()
}
