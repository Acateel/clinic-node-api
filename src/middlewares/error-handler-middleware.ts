import { ErrorRequestHandler } from 'express'
import { isHttpError } from 'http-errors'
import StatusCode from 'status-code-enum'

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error('[SERVER ERROR]', error)
  let statusCode = StatusCode.ServerErrorInternal
  let errorMessage = 'An unknown error occured'

  if (isHttpError(error)) {
    statusCode = error.status
    errorMessage = error.message
  }

  res.status(statusCode).json({
    error: {
      message: errorMessage,
    },
  })
}
