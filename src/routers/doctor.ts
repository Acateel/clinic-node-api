import express, { Request, Response } from 'express'

const doctorRouter = express.Router()

// Get all
doctorRouter.get('/', (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Get by id
doctorRouter.get('/:id', (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Create
doctorRouter.post('/', (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Update by id
doctorRouter.patch('/:id', (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Delete by id
doctorRouter.delete('/:id', (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented' })
})

export default doctorRouter
