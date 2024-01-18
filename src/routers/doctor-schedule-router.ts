import express from 'express'
import StatusCode from 'status-code-enum'
import { doctorScheduleService } from '../services/doctor-schedule-service'
import { CreateDoctorScheduleDto } from '../dto/doctor-schedule/create-doctor-schedule-dto'
import { UpdateDoctorScheduleDto } from '../dto/doctor-schedule/update-doctor-schedule-dto'

export const doctorScheduleRouter = express.Router({ mergeParams: true })

// Get by doctorId
doctorScheduleRouter.get('/', async (req, res, next) => {
  try {
    const { doctorId } = req.params as any
    const schedules = await doctorScheduleService.getByDoctorId(doctorId)
    res.status(StatusCode.SuccessOK).json(schedules)
  } catch (error) {
    next(error)
  }
})

// Get by id
doctorScheduleRouter.get('/:id', async (req, res, next) => {
  try {
    const schedule = await doctorScheduleService.getById(+req.params.id)
    res.status(StatusCode.SuccessOK).json(schedule)
  } catch (error) {
    next(error)
  }
})

// Create
doctorScheduleRouter.post('/', async (req, res, next) => {
  try {
    const { doctorId } = req.params as any
    const { startTime, endTime } = req.body
    const schedule = await doctorScheduleService.create(
      new CreateDoctorScheduleDto(
        +doctorId,
        new Date(startTime),
        new Date(endTime)
      )
    )
    res.status(StatusCode.SuccessCreated).json(schedule)
  } catch (error) {
    next(error)
  }
})

// Update
doctorScheduleRouter.patch('/:id', async (req, res, next) => {
  try {
    const { doctorId } = req.params as any
    const { startTime, endTime } = req.body
    const schedule = await doctorScheduleService.update(
      new UpdateDoctorScheduleDto(
        +req.params.id,
        +doctorId,
        new Date(startTime),
        new Date(endTime)
      )
    )
    res.status(StatusCode.SuccessOK).json(schedule)
  } catch (error) {
    next(error)
  }
})

// Delete
doctorScheduleRouter.delete('/:id', async (req, res, next) => {
  try {
    const result = await doctorScheduleService.delete(+req.params.id)
    res.status(StatusCode.SuccessOK).json(result)
  } catch (error) {
    next(error)
  }
})
