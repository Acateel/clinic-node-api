import express from 'express'

const doctorRouter = express.Router()

// Get all
doctorRouter.get('/', (req, res) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Get by id
doctorRouter.get('/:id', (req, res) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Create
doctorRouter.post('/', (req, res) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Update by id
doctorRouter.patch('/:id', (req, res) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Delete by id
doctorRouter.delete('/:id', (req, res) => {
  res.status(501).json({ message: 'Not implemented' })
})

export default doctorRouter
