import { Between } from 'typeorm'
import { dataSourse } from '../database/data-sourse'
import { AppointmentEntity } from '../database/entity/appointment-entity'
import createHttpError from 'http-errors'
import { doctorScheduleService } from './doctor-schedule-service'

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

  async create(
    patientId: number,
    doctorId: number,
    startTime: Date,
    endTime: Date
  ) {
    const appointmentRepo = dataSourse.getRepository(AppointmentEntity)

    const isTimesInDoctorSchedules =
      await doctorScheduleService.isTimesInSchedule(
        doctorId,
        startTime,
        endTime
      )
    if (!isTimesInDoctorSchedules) {
      throw createHttpError(400, 'This time out of doctor schedule')
    }

    const canAddNewAppointment = await this.checkForCreate(
      doctorId,
      startTime,
      endTime
    )
    if (!canAddNewAppointment) {
      throw createHttpError(400, 'Cannot add appointment in this time')
    }

    const appointment = appointmentRepo.create({
      patient: { id: patientId },
      doctor: { id: doctorId },
      startTime,
      endTime,
    })
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

    const isTimesInDoctorSchedules =
      await doctorScheduleService.isTimesInSchedule(
        doctorId,
        startTime,
        endTime
      )
    if (!isTimesInDoctorSchedules) {
      throw createHttpError(400, 'This time out of doctor schedule')
    }

    const canUpdateAppointment = await this.checkForUpdate(
      appointment.id,
      doctorId,
      startTime,
      endTime
    )
    if (!canUpdateAppointment) {
      throw createHttpError(400, 'Cannot update appointment in this time')
    }

    appointmentRepo.merge(appointment, {
      doctor: { id: doctorId },
      startTime,
      endTime,
    })
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
