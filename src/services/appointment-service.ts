import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm'
import { dataSourse } from '../database/data-sourse'
import { AppointmentEntity } from '../database/entity/appointment-entity'
import createHttpError from 'http-errors'
import { doctorScheduleService } from './doctor-schedule-service'
import { patientService } from './patient-service'
import { doctorService } from './doctor-service'
import StatusCode from 'status-code-enum'
import { validateDto, validDto } from '../util/validate-decorators'
import { CreateAppointmentDto } from '../dto/appointment/create-appointment-dto'
import { UpdateAppointmentDto } from '../dto/appointment/update-appointment-dto'

class AppointmentService {
  async get() {
    const appointmentRepo = dataSourse.getRepository(AppointmentEntity)
    const appointments = await appointmentRepo.find()
    return appointments
  }

  async getById(id: number) {
    const appointmentRepo = dataSourse.getRepository(AppointmentEntity)
    const appointment = await appointmentRepo.findOneBy({ id })
    return appointment
  }

  async getByDoctorIdAndDay(doctorId: number, date: Date) {
    const appointmentRepo = dataSourse.getRepository(AppointmentEntity)

    const startOfDay = new Date(
      `${date.toISOString().split('T')[0]}T00:00:00.000Z`
    )
    const endOfDay = new Date(
      `${date.toISOString().split('T')[0]}T23:59:59.999Z`
    )

    const appointmentsByDay = await appointmentRepo.find({
      where: {
        doctor: {
          id: doctorId,
        },
        startTime: Between(startOfDay, endOfDay),
      },
      order: {
        startTime: 'ASC',
      },
    })

    return appointmentsByDay
  }

  async getByDoctorSchedule(doctorId: number, startTime: Date, endTime: Date) {
    const appointmentRepo = dataSourse.getRepository(AppointmentEntity)

    const appointmentsBySchedule = await appointmentRepo.find({
      where: {
        doctor: {
          id: doctorId,
        },
        startTime: MoreThanOrEqual(startTime),
        endTime: LessThanOrEqual(endTime),
      },
    })

    return appointmentsBySchedule
  }

  @validateDto
  async create(@validDto appointmentDto: CreateAppointmentDto) {
    this.throwIfBadDate(appointmentDto.startTime, appointmentDto.endTime)

    const appointmentRepo = dataSourse.getRepository(AppointmentEntity)

    const patient = await patientService.getById(appointmentDto.patientId)
    if (!patient) {
      throw createHttpError(
        StatusCode.ClientErrorNotFound,
        'Patient with patientId dont found'
      )
    }

    const doctor = await doctorService.getById(appointmentDto.doctorId)
    if (!doctor) {
      throw createHttpError(
        StatusCode.ClientErrorNotFound,
        'Doctor with doctorId dont found'
      )
    }

    const isTimesInDoctorSchedules =
      await doctorScheduleService.isTimesInSchedule(
        appointmentDto.doctorId,
        appointmentDto.startTime,
        appointmentDto.endTime
      )

    if (!isTimesInDoctorSchedules) {
      throw createHttpError(
        StatusCode.ClientErrorBadRequest,
        'This time out of doctor schedule'
      )
    }

    const canAddNewAppointment = await this.checkForCreate(
      appointmentDto.doctorId,
      appointmentDto.startTime,
      appointmentDto.endTime
    )

    if (!canAddNewAppointment) {
      throw createHttpError(
        StatusCode.ClientErrorBadRequest,
        'Cannot add appointment in this time'
      )
    }

    const appointment = new AppointmentEntity()
    appointment.patient = patient
    appointment.doctor = doctor
    appointment.startTime = appointmentDto.startTime
    appointment.endTime = appointmentDto.endTime

    const result = await appointmentRepo.save(appointment)

    return result
  }

  @validateDto
  async update(@validDto appointmentDto: UpdateAppointmentDto) {
    this.throwIfBadDate(appointmentDto.startTime, appointmentDto.endTime)

    const appointmentRepo = dataSourse.getRepository(AppointmentEntity)

    const appointment = await appointmentRepo.findOneBy({
      id: appointmentDto.appointmentId,
    })

    const doctor = await doctorService.getById(appointmentDto.doctorId)
    if (!doctor) {
      throw createHttpError(
        StatusCode.ClientErrorNotFound,
        'Doctor with doctorId dont found'
      )
    }

    const isTimesInDoctorSchedules =
      await doctorScheduleService.isTimesInSchedule(
        appointmentDto.doctorId,
        appointmentDto.startTime,
        appointmentDto.endTime
      )

    if (!isTimesInDoctorSchedules) {
      throw createHttpError(
        StatusCode.ClientErrorBadRequest,
        'This time out of doctor schedule'
      )
    }

    const canUpdateAppointment = await this.checkForUpdate(
      appointment.id,
      appointmentDto.doctorId,
      appointmentDto.startTime,
      appointmentDto.endTime
    )

    if (!canUpdateAppointment) {
      throw createHttpError(
        StatusCode.ClientErrorBadRequest,
        'Cannot update appointment in this time'
      )
    }

    appointment.doctor = doctor
    appointment.startTime = appointmentDto.startTime
    appointment.endTime = appointmentDto.endTime

    const result = await appointmentRepo.save(appointment)
    return result
  }

  async delete(id: number) {
    const appointmentRepo = dataSourse.getRepository(AppointmentEntity)
    const result = await appointmentRepo.delete(id)
    return result
  }

  async checkForCreate(doctorId: number, startTime: Date, endTime: Date) {
    const appointmentsByDay = await this.getByDoctorIdAndDay(
      doctorId,
      startTime
    )
    const canAddNewAppointment = this.checkAppoitmentTimes(
      appointmentsByDay,
      startTime,
      endTime
    )
    return canAddNewAppointment
  }

  async checkForUpdate(
    appointmentId: number,
    doctorId: number,
    startTime: Date,
    endTime: Date
  ) {
    const appointmentsByDay = await this.getByDoctorIdAndDay(
      doctorId,
      startTime
    )
    const appointmentsByDayWitoutOne = appointmentsByDay.filter(
      (appointment) => appointment.id !== appointmentId
    )
    const canUpdateAppointment = this.checkAppoitmentTimes(
      appointmentsByDayWitoutOne,
      startTime,
      endTime
    )
    return canUpdateAppointment
  }

  checkAppoitmentTimes(
    appointmentsByDay: AppointmentEntity[],
    startTime: Date,
    endTime: Date
  ) {
    if (
      appointmentsByDay.length === 0 ||
      endTime <= appointmentsByDay[0].startTime ||
      startTime >= appointmentsByDay[appointmentsByDay.length - 1].endTime
    ) {
      return true
    }

    for (let i = 0; i < appointmentsByDay.length - 1; i++) {
      if (
        startTime >= appointmentsByDay[i].endTime &&
        endTime <= appointmentsByDay[i + 1].startTime
      ) {
        return true
      }
    }

    return false
  }

  throwIfBadDate(startTime: Date, endTime: Date) {
    const now = new Date()

    if (startTime < now) {
      throw createHttpError(
        StatusCode.ClientErrorBadRequest,
        'Start time cannot be in past'
      )
    }

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

    if (startTime.toDateString() !== endTime.toDateString()) {
      throw createHttpError(
        StatusCode.ClientErrorBadRequest,
        'Start and end times connot be in different days'
      )
    }
  }
}

export const appointmentService = new AppointmentService()
