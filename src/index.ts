import express from 'express'
import dotenv from 'dotenv'

import { doctorRouter } from './routers/doctor-router'
import { patientRouter } from './routers/patient-router'
import { appointmentRouter } from './routers/appointment-router'
import { dataSourse } from './database/data-sourse'
import { errorHandler } from './middlewares/error-handler-middleware'
import { doctorScheduleRouter } from './routers/doctor-schedule-router'
import { authRouter } from './routers/auth-router'
import { userRouter } from './routers/user-router'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/doctors', doctorRouter)
app.use('/doctors/:doctorId/schedules', doctorScheduleRouter)
app.use('/patients', patientRouter)
app.use('/appointments', appointmentRouter)
app.use('', authRouter)
app.use('/users', userRouter)

app.use(errorHandler)

async function setupApplication() {
  await dataSourse.initialize()
  console.log('[SERVER_DATABASE] Data Source has been initialized!')

  const port = process.env.PORT
  const url = process.env.URL
  app.listen(port, () => {
    console.log(`[SERVER]: Server is running at ${url}:${port}`)
  })
}

setupApplication()
