import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm'
import { dataSourse } from '../database/data-sourse'
import { DoctorScheduleEntity } from '../database/entity/doctor-schedule-entity'
import { appointmentService } from './appointment-service'
import createHttpError from 'http-errors'
import { doctorService } from './doctor-service'
import StatusCode from 'status-code-enum'
import { validDto, validateDto } from '../util/validate-decorators'
import { CreateDoctorScheduleDto } from '../dto/doctor-schedule/create-doctor-schedule-dto'
import { UpdateDoctorScheduleDto } from '../dto/doctor-schedule/update-doctor-schedule-dto'

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

  @validateDto
  async create(@validDto doctorScheduleDto: CreateDoctorScheduleDto) {
    this.throwIfBadDate(doctorScheduleDto.startTime, doctorScheduleDto.endTime)

    const scheduleRepo = dataSourse.getRepository(DoctorScheduleEntity)

    const doctor = await doctorService.getById(doctorScheduleDto.doctorId)
    if (!doctor) {
      throw createHttpError(
        StatusCode.ClientErrorNotFound,
        'Doctor with doctorId dont found'
      )
    }

    const schedule = new DoctorScheduleEntity()
    schedule.doctor = doctor
    schedule.startTime = doctorScheduleDto.startTime
    schedule.endTime = doctorScheduleDto.endTime

    const result = await scheduleRepo.save(schedule)
    return result
  }

  @validateDto
  async update(@validDto doctorScheduleDto: UpdateDoctorScheduleDto) {
    this.throwIfBadDate(doctorScheduleDto.startTime, doctorScheduleDto.endTime)

    const scheduleRepo = dataSourse.getRepository(DoctorScheduleEntity)

    const doctor = await doctorService.getById(doctorScheduleDto.doctorId)
    if (!doctor) {
      throw createHttpError(
        StatusCode.ClientErrorNotFound,
        'Doctor with doctorId dont found'
      )
    }

    const schedule = await scheduleRepo.findOne({
      where: {
        id: doctorScheduleDto.id,
      },
      relations: {
        doctor: true,
      },
    })

    const isNewScheduleCorrect = await this.isNewScheduleIncludeAppointments(
      schedule,
      doctorScheduleDto.startTime,
      doctorScheduleDto.endTime
    )

    if (!isNewScheduleCorrect) {
      throw createHttpError(
        StatusCode.ClientErrorBadRequest,
        'Cannot update schedule, didnt include appointments'
      )
    }

    schedule.doctor = doctor
    schedule.startTime = doctorScheduleDto.startTime
    schedule.endTime = doctorScheduleDto.endTime

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

  throwIfBadDate(startTime: Date, endTime: Date) {
    if (startTime > endTime) {
      throw createHttpError(
        StatusCode.ClientErrorBadRequest,
        'Start time cannot be after end time'
      )
    }

    if (startTime.toISOString() === endTime.toISOString()) {
      throw createHttpError(
        StatusCode.ClientErrorBadRequest,
        'Start and end times connot be one the same'
      )
    }
  }
}

export const doctorScheduleService = new DoctorScheduleService()
