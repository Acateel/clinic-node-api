import express, { Request, Response } from 'express'

const appointmentRouter = express.Router()

// Get all
appointmentRouter.get('/', (req: Request, res: Response) => {})

// Get by id
appointmentRouter.get('/:id', (req: Request, res: Response) => {})

// Create
appointmentRouter.post('/', (req: Request, res: Response) => {})

// Update by id
appointmentRouter.patch('/:id', (req: Request, res: Response) => {})

// Delete by id
appointmentRouter.delete('/:id', (req: Request, res: Response) => {})

export default appointmentRouter
