import express from 'express'

export const appointmentRouter = express.Router()

// Get
appointmentRouter.get('/', (req, res) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Get by id
appointmentRouter.get('/:id', (req, res) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Create
appointmentRouter.post('/', (req, res) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Update
appointmentRouter.patch('/:id', (req, res) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Delete
appointmentRouter.delete('/:id', (req, res) => {
  res.status(501).json({ message: 'Not implemented' })
})
