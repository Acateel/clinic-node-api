import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm'
import { dataSourse } from '../database/data-sourse'
import { DoctorScheduleEntity } from '../database/entity/doctor-schedule-entity'
import { appointmentService } from './appointment-service'
import createHttpError from 'http-errors'
import { doctorService } from './doctor-service'
import StatusCode from 'status-code-enum'

class DoctorScheduleService {
  async get() {
    const scheduleRepo = dataSourse.getRepository(DoctorScheduleEntity)
    const schedules = await scheduleRepo.find()
    return schedules
  }

  async getByDoctorId(doctorId: number) {
    const scheduleRepo = dataSourse.getRepository(DoctorScheduleEntity)
    const schedules = await scheduleRepo.findBy({ doctor: { id: doctorId } })
    return schedules
  }

  async getById(id: number) {
    const scheduleRepo = dataSourse.getRepository(DoctorScheduleEntity)
    const schedule = await scheduleRepo.findOneBy({ id })
    return schedule
  }

  async create(doctorId: number, startTime: Date, endTime: Date) {
    const scheduleRepo = dataSourse.getRepository(DoctorScheduleEntity)

    const doctor = await doctorService.getById(doctorId)
    if (!doctor) {
      throw createHttpError(
        StatusCode.ClientErrorNotFound,
        'Doctor with doctorId dont found'
      )
    }

    const schedule = new DoctorScheduleEntity()
    schedule.doctor = doctor
    schedule.startTime = startTime
    schedule.endTime = endTime

    const result = await scheduleRepo.save(schedule)
    return result
  }

  async update(id: number, doctorId: number, startTime: Date, endTime: Date) {
    const scheduleRepo = dataSourse.getRepository(DoctorScheduleEntity)

    const doctor = await doctorService.getById(doctorId)
    if (!doctor) {
      throw createHttpError(
        StatusCode.ClientErrorNotFound,
        'Doctor with doctorId dont found'
      )
    }

    const schedule = await scheduleRepo.findOne({
      where: {
        id,
      },
      relations: {
        doctor: true,
      },
    })

    const isNewScheduleCorrect = await this.isNewScheduleIncludeAppointments(
      schedule,
      startTime,
      endTime
    )

    if (!isNewScheduleCorrect) {
      throw createHttpError(
        StatusCode.ClientErrorBadRequest,
        'Cannot update schedule, didnt include appointments'
      )
    }

    schedule.doctor = doctor
    schedule.startTime = startTime
    schedule.endTime = endTime

    const result = await scheduleRepo.save(schedule)
    return result
  }

  async delete(id: number) {
    const scheduleRepo = dataSourse.getRepository(DoctorScheduleEntity)
    const result = await scheduleRepo.delete(id)
    return result
  }

  async isTimesInSchedule(doctorId: number, startTime: Date, endTime: Date) {
    const scheduleRepo = dataSourse.getRepository(DoctorScheduleEntity)
    const schedule = await scheduleRepo.findOneBy({
      doctor: {
        id: doctorId,
      },
      startTime: LessThanOrEqual(startTime),
      endTime: MoreThanOrEqual(endTime),
    })
    if (schedule) {
      return true
    }
    return false
  }

  async isNewScheduleIncludeAppointments(
    oldSchedule: DoctorScheduleEntity,
    newStartTime: Date,
    newEndTime: Date
  ) {
    const appointments = await appointmentService.getByDoctorSchedule(
      oldSchedule.doctor.id,
      oldSchedule.startTime,
      oldSchedule.endTime
    )

    const newScheduleIncludeAppointments = appointments.every(
      (appointment) =>
        appointment.startTime >= newStartTime &&
        appointment.endTime <= newEndTime
    )

    return newScheduleIncludeAppointments
  }
}

export const doctorScheduleService = new DoctorScheduleService()
