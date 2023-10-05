import { ErrorRequestHandler } from 'express'
import { isHttpError } from 'http-errors'

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error('[SERVER ERROR]', error)
  let statusCode = 500
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
