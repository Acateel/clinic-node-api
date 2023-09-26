import express from 'express'
import doctorRouter from './routers/doctor'
import patientRouter from './routers/patient'
import appointmentRouter from './routers/appointment'
import bodyParser from 'body-parser'

const app = express()

// add body parser 
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Include routers
app.use('/doctors', doctorRouter)
app.use('/patients', patientRouter)
app.use('/appointments', appointmentRouter)

export default app
