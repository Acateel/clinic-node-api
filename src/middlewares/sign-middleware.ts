import { RequestHandler } from 'express'
import { matchEmail } from '../util/format-email'
import createHttpError from 'http-errors'
import StatusCode from 'status-code-enum'
import { formatPhoneNumber } from '../util/format-phone-number'

export const SignMiddleware: RequestHandler = (req, res, next) => {
  const { email, phoneNumber } = req.body

  if (!email && !phoneNumber) {
    next(
      createHttpError(
        StatusCode.ClientErrorBadRequest,
        'Dont have email or phone number'
      )
    )
  }

  if (email && phoneNumber) {
    next(
      createHttpError(
        StatusCode.ClientErrorBadRequest,
        'Need select email or phone number'
      )
    )
  }

  if (email) {
    const matchedEmail = matchEmail(email)

    if (!matchedEmail) {
      throw createHttpError(
        StatusCode.ClientErrorForbidden,
        'Email is not format'
      )
    }
  }

  if (phoneNumber) {
    const formatedPhoneNumber = formatPhoneNumber(phoneNumber)
    if (!formatedPhoneNumber) {
      next(
        createHttpError(
          StatusCode.ClientErrorBadRequest,
          'Invalid phone number'
        )
      )
    }
    req.body.phoneNumber = formatedPhoneNumber
  }

  next()
}
