import dotenv from 'dotenv'
import express from 'express'
import doctorRouter from './routers/doctor'
import patientRouter from './routers/patient'
import appointmentRouter from './routers/appointment'

//read .env file
dotenv.config()

const app = express()
const port = process.env.PORT

// Include routers
app.use('/doctors', doctorRouter)
app.use('/patient', patientRouter)
app.use('/appointment', appointmentRouter)

// Start server
app.listen(port, () => {
  console.log(`[SERVER]: Server is running at http://localhost:${port}`)
})
