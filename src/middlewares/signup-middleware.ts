import { RequestHandler } from 'express'
import { matchEmail } from '../util/format-email'
import { formatPhoneNumber } from '../util/format-phone-number'
import { UserRole } from '../database/entity/user-entity'
import createHttpError from 'http-errors'
import StatusCode from 'status-code-enum'

export const SignupMiddleware: RequestHandler = (req, res, next) => {
  const { role, email, phoneNumber } = req.body

  req.body.email = matchEmail(email)

  if (email != req.body.email) {
    throw createHttpError(
      StatusCode.ClientErrorForbidden,
      'Email is not format'
    )
  }

  if (phoneNumber) {
    req.body.phoneNumber = formatPhoneNumber(phoneNumber)
  }

  if (!Object.values(UserRole).includes(role)) {
    next(
      createHttpError(StatusCode.ClientErrorForbidden, 'Dont have this role')
    )
  }

  next()
}
