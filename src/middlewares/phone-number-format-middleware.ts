import { RequestHandler } from 'express'
import { formatPhoneNumber } from '../util/format-phone-number'
import createHttpError from 'http-errors'
import StatusCode from 'status-code-enum'

export const FormatPhoneNumberMiddleware: RequestHandler = (req, res, next) => {
  const { phoneNumber } = req.body
  const formatedPhoneNumber = formatPhoneNumber(phoneNumber)
  if (!formatedPhoneNumber) {
    next(
      createHttpError(StatusCode.ClientErrorBadRequest, 'Invalid phone number')
    )
  }
  req.body.phoneNumber = formatedPhoneNumber
  next()
}
