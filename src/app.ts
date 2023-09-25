import dotenv from 'dotenv'
//read .env file
dotenv.config()

import express from 'express'
import doctorRouter from './routers/doctor'
import patientRouter from './routers/patient'
import appointmentRouter from './routers/appointment'
import dataSourse from './database/dataSourse'


const app = express()
const port = process.env.PORT

dataSourse
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

// Include routers
app.use('/doctors', doctorRouter)
app.use('/patient', patientRouter)
app.use('/appointment', appointmentRouter)

// Start server
app.listen(port, () => {
  console.log(`[SERVER]: Server is running at http://localhost:${port}`)
})
