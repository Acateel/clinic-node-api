import express from 'express'
import { doctorService } from '../services/doctor-service'
import StatusCode from 'status-code-enum'

export const doctorRouter = express.Router()

// Get
doctorRouter.get('/', async (req, res, next) => {
  try {
    const doctors = await doctorService.get()
    res.status(StatusCode.SuccessOK).json(doctors)
  } catch (error) {
    next(error)
  }
})

// Get by id
doctorRouter.get('/:id', async (req, res, next) => {
  try {
    const doctor = await doctorService.getById(+req.params.id)
    res.status(StatusCode.SuccessOK).json(doctor)
  } catch (error) {
    next(error)
  }
})

// Create
doctorRouter.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, specialty } = req.body
    const doctor = await doctorService.create(firstName, lastName, specialty)
    res.status(StatusCode.SuccessCreated).json(doctor)
  } catch (error) {
    next(error)
  }
})

// Update
doctorRouter.patch('/:id', async (req, res, next) => {
  try {
    const { firstName, lastName, specialty } = req.body
    const doctor = await doctorService.update(
      +req.params.id,
      firstName,
      lastName,
      specialty
    )
    res.status(StatusCode.SuccessOK).json(doctor)
  } catch (error) {
    next(error)
  }
})

// Delete
doctorRouter.delete('/:id', async (req, res, next) => {
  try {
    const doctor = await doctorService.delete(+req.params.id)
    res.status(StatusCode.SuccessOK).json(doctor)
  } catch (error) {
    next(error)
  }
})
