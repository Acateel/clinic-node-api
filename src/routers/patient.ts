import express, { Request, Response } from 'express'

const patientRouter = express.Router()

// Get all
patientRouter.get('/', (req: Request, res: Response) => {})

// Get by id
patientRouter.get('/:id', (req: Request, res: Response) => {})

// Create
patientRouter.post('/', (req: Request, res: Response) => {})

// Update by id
patientRouter.patch('/:id', (req: Request, res: Response) => {})

// Delete by id
patientRouter.delete('/:id', (req: Request, res: Response) => {})

export default patientRouter
