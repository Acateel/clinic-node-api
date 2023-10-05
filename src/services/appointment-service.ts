import { Between } from 'typeorm'
import { dataSourse } from '../database/data-sourse'
import { AppointmentEntity } from '../database/entity/appointment-entity'
import createHttpError from 'http-errors'

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

  async create(
    patientId: number,
    doctorId: number,
    startTime: Date,
    endTime: Date
  ) {
    const appointmentRepo = dataSourse.getRepository(AppointmentEntity)

    const canAddNewAppointment = await this.checkAppoitmentTimes(
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

  async checkAppoitmentTimes(doctorId: number, startTime: Date, endTime: Date) {
    const appointmentsByDay = await this.getByDoctorIdAndDay(
      doctorId,
      startTime
    )

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

  async update() {}

  async delete(id: number) {
    const appointmentRepo = dataSourse.getRepository(AppointmentEntity)
    const result = await appointmentRepo.delete(id)
    return result
  }
}

export const appointmentService = new AppointmentService()
