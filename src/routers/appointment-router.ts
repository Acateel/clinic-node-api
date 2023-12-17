import express from 'express'
import { appointmentService } from '../services/appointment-service'
import { AppointmentTimesParsingMiddleware } from '../middlewares/appointment-times-parsing-middleware'
import StatusCode from 'status-code-enum'

export const appointmentRouter = express.Router()

// Get
appointmentRouter.get('/', async (req, res, next) => {
  try {
    const { doctorId, day } = req.query
    let appointments
    if (doctorId !== undefined || day !== undefined) {
      appointments = await appointmentService.getByDoctorIdAndDay(
        +doctorId,
        new Date(day.toString())
      )
    } else {
      appointments = await appointmentService.get()
    }
    res.status(StatusCode.SuccessOK).json(appointments)
  } catch (error) {
    next(error)
  }
})

// Get by id
appointmentRouter.get('/:id', async (req, res, next) => {
  try {
    const appointment = await appointmentService.getById(+req.params.id)
    res.status(StatusCode.SuccessOK).json(appointment)
  } catch (error) {
    next(error)
  }
})

// Create
appointmentRouter.post(
  '/',
  AppointmentTimesParsingMiddleware,
  async (req, res, next) => {
    try {
      const { patientId, doctorId, startTime, endTime } = req.body
      const appointment = await appointmentService.create(
        patientId,
        doctorId,
        startTime,
        endTime
      )
      res.status(StatusCode.SuccessCreated).json(appointment)
    } catch (error) {
      next(error)
    }
  }
)

// Update
appointmentRouter.patch(
  '/:id',
  AppointmentTimesParsingMiddleware,
  async (req, res, next) => {
    try {
      const { doctorId, startTime, endTime } = req.body
      const appointment = await appointmentService.update(
        +req.params.id,
        doctorId,
        startTime,
        endTime
      )
      res.status(StatusCode.SuccessOK).json(appointment)
    } catch (error) {
      next(error)
    }
  }
)

// Delete
appointmentRouter.delete('/:id', async (req, res, next) => {
  try {
    const appointment = await appointmentService.delete(+req.params.id)
    res.status(StatusCode.SuccessOK).json(appointment)
  } catch (error) {
    next(error)
  }
})
