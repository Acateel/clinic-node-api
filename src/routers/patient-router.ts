import express from 'express'
import { patientService } from '../services/patient-service'

export const patientRouter = express.Router()

// Get
patientRouter.get('/', async (req, res) => {
  try {
    const patients = await patientService.get()
    res.status(200).json(patients)
  } catch (error) {
    console.log('[PATIENTS_GET_ALL]', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Get by id
patientRouter.get('/:id', async (req, res) => {
  try {
    const patient = await patientService.getById(+req.params.id)
    res.status(200).json(patient)
  } catch (error) {
    console.log('[PATIENTS_GET]', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Create
patientRouter.post('/', async (req, res) => {
  try {
    const { firstName, lastName } = req.body
    const patient = await patientService.create(firstName, lastName)
    res.status(200).json(patient)
  } catch (error) {
    console.log('[PATIENTS_POST]', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Update
patientRouter.patch('/:id', async (req, res) => {
  try {
    const { firstName, lastName } = req.body
    const patient = await patientService.update(
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

// Delete
patientRouter.delete('/:id', async (req, res) => {
  try {
    const patient = await patientService.delete(+req.params.id)
    res.status(200).json(patient)
  } catch (error) {
    console.log('[PATIENTS_DELETE]', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})
