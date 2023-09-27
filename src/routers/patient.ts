import express, { Request, Response } from 'express'
import PatientService from '../services/patient-service'

const patientRouter = express.Router()

// Get all
patientRouter.get('/', async (req: Request, res: Response) => {
  try {
    const patients = await PatientService.getAll()
    res.status(200).json(patients)
  } catch (error) {
    console.log('[PATIENTS_GET_ALL]', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Get by id
patientRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const patient = await PatientService.getById(+req.params.id)
    res.status(200).json(patient)
  } catch (error) {
    console.log('[PATIENTS_GET]', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Create
patientRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { firstName, lastName } = req.body
    const patient = await PatientService.createOne(firstName, lastName)
    res.status(200).json(patient)
  } catch (error) {
    console.log('[PATIENTS_POST]', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Update by id
patientRouter.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { firstName, lastName } = req.body
    const patient = await PatientService.updateById(
      +req.params.id,
      firstName,
      lastName
    )
    res.status(200).json(patient)
  } catch (error) {
    console.log('[PATIENTS_PATCH]', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Delete by id
patientRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const patient = await PatientService.deleteById(+req.params.id)
    res.status(200).json(patient)
  } catch (error) {
    console.log('[PATIENTS_DELETE]', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

export default patientRouter
