import express from 'express'
import { appointmentService } from '../services/appointment-service'
import StatusCode from 'status-code-enum'
import { CreateAppointmentDto } from '../dto/appointment/create-appointment-dto'
import { UpdateAppointmentDto } from '../dto/appointment/update-appointment-dto'

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
appointmentRouter.post('/', async (req, res, next) => {
  try {
    const appointment = await appointmentService.create(
      new CreateAppointmentDto(
        req.body.patientId,
        req.body.doctorId,
        new Date(req.body.startTime),
        new Date(req.body.endTime)
      )
    )
    res.status(StatusCode.SuccessCreated).json(appointment)
  } catch (error) {
    next(error)
  }
})

// Update
appointmentRouter.patch('/:id', async (req, res, next) => {
  try {
    const appointment = await appointmentService.update(
      new UpdateAppointmentDto(
        +req.params.id,
        req.body.doctorId,
        new Date(req.body.startTime),
        new Date(req.body.endTime)
      )
    )
    res.status(StatusCode.SuccessOK).json(appointment)
  } catch (error) {
    next(error)
  }
})

// Delete
appointmentRouter.delete('/:id', async (req, res, next) => {
  try {
    const appointment = await appointmentService.delete(+req.params.id)
    res.status(StatusCode.SuccessOK).json(appointment)
  } catch (error) {
    next(error)
  }
})
