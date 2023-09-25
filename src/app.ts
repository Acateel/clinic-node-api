import express from 'express'
import doctorRouter from './routers/doctor'
import patientRouter from './routers/patient'
import appointmentRouter from './routers/appointment'

const app = express()

// Include routers
app.use('/doctors', doctorRouter)
app.use('/patient', patientRouter)
app.use('/appointment', appointmentRouter)

export default app
