import express, { Request, Response } from 'express'

const appointmentRouter = express.Router()

// Get all
appointmentRouter.get('/', (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Get by id
appointmentRouter.get('/:id', (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Create
appointmentRouter.post('/', (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Update by id
appointmentRouter.patch('/:id', (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Delete by id
appointmentRouter.delete('/:id', (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented' })
})

export default appointmentRouter
