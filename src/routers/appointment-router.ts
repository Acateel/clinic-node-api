import express from 'express'

const appointmentRouter = express.Router()

// Get all
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

// Update by id
appointmentRouter.patch('/:id', (req, res) => {
  res.status(501).json({ message: 'Not implemented' })
})

// Delete by id
appointmentRouter.delete('/:id', (req, res) => {
  res.status(501).json({ message: 'Not implemented' })
})

export default appointmentRouter
