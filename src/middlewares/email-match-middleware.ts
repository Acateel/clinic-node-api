import { RequestHandler } from 'express'
import { matchEmail } from '../util/format-email'
import createHttpError from 'http-errors'
import StatusCode from 'status-code-enum'

export const EmailMatchMiddleware: RequestHandler = (req, res, next) => {
  const { email } = req.body

  const matchedEmail = matchEmail(email)

  if (!matchedEmail) {
    throw createHttpError(
      StatusCode.ClientErrorForbidden,
      'Email is not format'
    )
  }

  next()
}
