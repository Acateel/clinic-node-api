import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import StatusCode from 'status-code-enum'

export const AppointmentTimesParsingMiddleware: RequestHandler = (
  req,
  res,
  next
) => {
  try {
    const startTime = new Date(req.body.startTime)
    const endTime = new Date(req.body.endTime)
    const now = new Date()

    if (startTime < now) {
      next(
        createHttpError(
          StatusCode.ClientErrorBadRequest,
          'Start time cannot be in past'
        )
      )
    }

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

    if (startTime.toDateString() !== endTime.toDateString()) {
      next(
        createHttpError(
          StatusCode.ClientErrorBadRequest,
          'Start and end times connot be in different days'
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
