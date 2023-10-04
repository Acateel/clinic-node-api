import { dataSourse } from '../database/data-sourse'
import { AppointmentEntity } from '../database/entity/appointment-entity'

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
    startTime: string,
    endTime: string
  ) {
    const appointmentRepo = dataSourse.getRepository(AppointmentEntity)

    // will add what startTime bigger then previus appointment.endTime
    // will add what endTime less then next appointment.startTime

    const appointment = appointmentRepo.create({
      patient: { id: patientId },
      doctor: { id: doctorId },
      startTime,
      endTime,
    })
    const result = await appointmentRepo.save(appointment)

    return result
  }

  async update() {}

  async delete(id: number) {
    const appointmentRepo = dataSourse.getRepository(AppointmentEntity)
    const result = await appointmentRepo.delete(id)
    return result
  }
}

export const appointmentService = new AppointmentService()
