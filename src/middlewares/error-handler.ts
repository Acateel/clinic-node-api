import { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(error)
  res.status(500).json({
    error: {
      message: 'An unknown error occured',
    },
  })
}
