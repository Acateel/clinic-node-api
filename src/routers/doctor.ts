import express, { Request, Response } from 'express'

const doctorRouter = express.Router()

// Get all
doctorRouter.get('/', (req: Request, res: Response) => {
    res.status(200).json({message: "Get all doctors"})
})

// Get by id
doctorRouter.get('/:id', (req: Request, res: Response) => {
    const {id} = req.params
    res.status(200).json({message: `Get doctor by id: ${id}`})
})

// Create
doctorRouter.post('/', (req: Request, res: Response) => {})

// Update by id
doctorRouter.patch('/:id', (req: Request, res: Response) => {})

// Delete by id
doctorRouter.delete('/:id', (req: Request, res: Response) => {})

export default doctorRouter
