import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import StatusCode from 'status-code-enum'

export const TimesParsingMiddleware: RequestHandler = (req, res, next) => {
  try {
    const startTime = new Date(req.body.startTime)
    const endTime = new Date(req.body.endTime)

    if (startTime > endTime) {
      next(
        createHttpError(
          StatusCode.ClientErrorBadRequest,
          'Start time cannot be after end time'
        )
      )
    }

    if (startTime.toISOString() === endTime.toISOString()) {
      next(
        createHttpError(
          StatusCode.ClientErrorBadRequest,
          'Start and end times connot be one the same'
        )
      )
    }

    req.body.startTime = startTime
    req.body.endTime = endTime
    next()
  } catch (error) {
    next(createHttpError(StatusCode.ClientErrorBadRequest, 'Invalid time'))
  }
}
