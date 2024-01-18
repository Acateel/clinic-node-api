import express from 'express'
import StatusCode from 'status-code-enum'
import { doctorService } from '../services/doctor-service'
import { CreateDoctorDto } from '../dto/doctor/create-doctor-dto'
import { UpdateDoctorDto } from '../dto/doctor/update-doctor-dto'

export const doctorRouter = express.Router()

// Get
doctorRouter.get('/', async (req, res, next) => {
  try {
    const doctors = await doctorService.get(req.query)
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
    const doctor = await doctorService.create(
      new CreateDoctorDto(
        req.body.firstName,
        req.body.lastName,
        req.body.specialty
      )
    )
    res.status(StatusCode.SuccessCreated).json(doctor)
  } catch (error) {
    next(error)
  }
})

// Update
doctorRouter.patch('/:id', async (req, res, next) => {
  try {
    const doctor = await doctorService.update(
      new UpdateDoctorDto(
        +req.params.id,
        req.body.firstName,
        req.body.lastName,
        req.body.specialty
      )
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
