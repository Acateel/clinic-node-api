import express from 'express'
import { patientService } from '../services/patient-service'
import { FormatPhoneNumberMiddleware } from '../middlewares/phone-number-format-middleware'
import StatusCode from 'status-code-enum'
import { CreatePatientDto } from '../dto/create-patient-dto'

export const patientRouter = express.Router()

// Get
patientRouter.get('/', async (req, res, next) => {
  try {
    const patients = await patientService.get(req.query)
    res.status(StatusCode.SuccessOK).json(patients)
  } catch (error) {
    next(error)
  }
})

// Get by id
patientRouter.get('/:id', async (req, res, next) => {
  try {
    const patient = await patientService.getById(+req.params.id)
    res.status(StatusCode.SuccessOK).json(patient)
  } catch (error) {
    next(error)
  }
})

// Create
patientRouter.post('/', async (req, res, next) => {
  try {
    const patient = await patientService.create(
      new CreatePatientDto(
        req.body.firstName,
        req.body.lastName,
        req.body.phoneNumber
      )
    )
    res.status(StatusCode.SuccessCreated).json(patient)
  } catch (error) {
    next(error)
  }
})

// Update
patientRouter.patch(
  '/:id',
  FormatPhoneNumberMiddleware,
  async (req, res, next) => {
    try {
      const { firstName, lastName, phoneNumber } = req.body
      const patient = await patientService.update(
        +req.params.id,
        firstName,
        lastName,
        phoneNumber
      )
      res.status(StatusCode.SuccessOK).json(patient)
    } catch (error) {
      next(error)
    }
  }
)

// Delete
patientRouter.delete('/:id', async (req, res, next) => {
  try {
    const patient = await patientService.delete(+req.params.id)
    res.status(StatusCode.SuccessOK).json(patient)
  } catch (error) {
    next(error)
  }
})
