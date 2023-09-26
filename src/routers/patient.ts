import express, { Request, Response } from 'express'

const patientRouter = express.Router()

// Get all
patientRouter.get('/', (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Get by id
patientRouter.get('/:id', (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Create
patientRouter.post('/', (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Update by id
patientRouter.patch('/:id', (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Delete by id
patientRouter.delete('/:id', (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented' })
})

export default patientRouter
