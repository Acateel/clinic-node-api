import express from 'express'
import { patientService } from '../services/patient-service'

export const patientRouter = express.Router()

// Get
patientRouter.get('/', async (req, res, next) => {
  try {
    const patients = await patientService.get()
    res.status(200).json(patients)
  } catch (error) {
    next(error)
  }
})

// Get by id
patientRouter.get('/:id', async (req, res, next) => {
  try {
    const patient = await patientService.getById(+req.params.id)
    res.status(200).json(patient)
  } catch (error) {
    next(error)
  }
})

// Create
patientRouter.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber } = req.body
    const patient = await patientService.create(
      firstName,
      lastName,
      phoneNumber
    )
    res.status(200).json(patient)
  } catch (error) {
    next(error)
  }
})

// Update
patientRouter.patch('/:id', async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber } = req.body
    const patient = await patientService.update(
      +req.params.id,
      firstName,
      lastName,
      phoneNumber
    )
    res.status(200).json(patient)
  } catch (error) {
    next(error)
  }
})

// Delete
patientRouter.delete('/:id', async (req, res, next) => {
  try {
    const patient = await patientService.delete(+req.params.id)
    res.status(200).json(patient)
  } catch (error) {
    next(error)
  }
})
