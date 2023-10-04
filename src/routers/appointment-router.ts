import express from 'express'
import { appointmentService } from '../services/appointment-service'

export const appointmentRouter = express.Router()

// Get
appointmentRouter.get('/', async (req, res, next) => {
  try {
    const appointments = await appointmentService.get()
    res.status(200).json(appointments)
  } catch (error) {
    next(error)
  }
})

// Get by id
appointmentRouter.get('/:id', async (req, res, next) => {
  try {
    const appointment = await appointmentService.getById(+req.params.id)
    res.status(200).json(appointment)
  } catch (error) {
    next(error)
  }
})

// Create
appointmentRouter.post('/', async (req, res, next) => {
  try {
    const { patientId, doctorId, startTime, endTime } = req.body
    const appointment = await appointmentService.create(
      patientId,
      doctorId,
      startTime,
      endTime
    )
    res.status(200).json(appointment)
  } catch (error) {
    next(error)
  }
})

// Update
appointmentRouter.patch('/:id', (req, res) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Delete
appointmentRouter.delete('/:id', async (req, res, next) => {
  try {
    const appointment = await appointmentService.delete(+req.params.id)
    res.status(200).json(appointment)
  } catch (error) {
    next(error)
  }
})
