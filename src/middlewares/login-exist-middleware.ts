import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import StatusCode from 'status-code-enum'

export const LoginExistMiddleware: RequestHandler = (req, res, next) => {
  const { login } = req.body

  if (!login) {
    next(createHttpError(StatusCode.ClientErrorNotFound, 'Login not found'))
  }

  next()
}
