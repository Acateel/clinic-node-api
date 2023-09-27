import express from 'express'

export const doctorRouter = express.Router()

// Get
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

// Update
doctorRouter.patch('/:id', (req, res) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Delete
doctorRouter.delete('/:id', (req, res) => {
  res.status(501).json({ message: 'Not implemented' })
})
