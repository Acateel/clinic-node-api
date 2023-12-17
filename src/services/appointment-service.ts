import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm'
import { dataSourse } from '../database/data-sourse'
import { AppointmentEntity } from '../database/entity/appointment-entity'
import createHttpError from 'http-errors'
import { doctorScheduleService } from './doctor-schedule-service'
import { patientService } from './patient-service'
import { doctorService } from './doctor-service'
import StatusCode from 'status-code-enum'

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

  async create(
    patientId: number,
    doctorId: number,
    startTime: Date,
    endTime: Date
  ) {
    const appointmentRepo = dataSourse.getRepository(AppointmentEntity)

    const patient = await patientService.getById(patientId)
    if (!patient) {
      throw createHttpError(
        StatusCode.ClientErrorNotFound,
        'Patient with patientId dont found'
      )
    }

    const doctor = await doctorService.getById(doctorId)
    if (!doctor) {
      throw createHttpError(
        StatusCode.ClientErrorNotFound,
        'Doctor with doctorId dont found'
      )
    }

    const isTimesInDoctorSchedules =
      await doctorScheduleService.isTimesInSchedule(
        doctorId,
        startTime,
        endTime
      )

    if (!isTimesInDoctorSchedules) {
      throw createHttpError(
        StatusCode.ClientErrorBadRequest,
        'This time out of doctor schedule'
      )
    }

    const canAddNewAppointment = await this.checkForCreate(
      doctorId,
      startTime,
      endTime
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
    appointment.startTime = startTime
    appointment.endTime = endTime

    const result = await appointmentRepo.save(appointment)

    return result
  }

  async update(
    appointmentId: number,
    doctorId: number,
    startTime: Date,
    endTime: Date
  ) {
    const appointmentRepo = dataSourse.getRepository(AppointmentEntity)

    const appointment = await appointmentRepo.findOneBy({ id: appointmentId })

    const doctor = await doctorService.getById(doctorId)
    if (!doctor) {
      throw createHttpError(
        StatusCode.ClientErrorNotFound,
        'Doctor with doctorId dont found'
      )
    }

    const isTimesInDoctorSchedules =
      await doctorScheduleService.isTimesInSchedule(
        doctorId,
        startTime,
        endTime
      )

    if (!isTimesInDoctorSchedules) {
      throw createHttpError(
        StatusCode.ClientErrorBadRequest,
        'This time out of doctor schedule'
      )
    }

    const canUpdateAppointment = await this.checkForUpdate(
      appointment.id,
      doctorId,
      startTime,
      endTime
    )

    if (!canUpdateAppointment) {
      throw createHttpError(
        StatusCode.ClientErrorBadRequest,
        'Cannot update appointment in this time'
      )
    }

    appointment.doctor = doctor
    appointment.startTime = startTime
    appointment.endTime = endTime

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
}

export const appointmentService = new AppointmentService()
