import { RequestHandler } from 'express'
import { formatPhoneNumber } from '../util/format-phone-number'
import createHttpError from 'http-errors'

export const FormatPhoneNumberMiddleware: RequestHandler = (req, res, next) => {
  const { phoneNumber } = req.body
  const formatedPhoneNumber = formatPhoneNumber(phoneNumber)
  if (!formatedPhoneNumber) {
    next(createHttpError(400, 'Invalid phone number'))
  }
  req.body.phoneNumber = formatedPhoneNumber
  next()
}
