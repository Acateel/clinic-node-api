import { dataSourse } from '../database/data-sourse'
import { DoctorEntity } from '../database/entity/doctor-entity'

class DoctorService {
  async get(filter: any) {
    const doctorRepo = dataSourse.getRepository(DoctorEntity)
    const doctors = await doctorRepo.findBy(this.convertFilter(filter))

    return doctors
  }

  async getById(id: number) {
    const doctorRepo = dataSourse.getRepository(DoctorEntity)
    const doctor = await doctorRepo.findOneBy({
      id,
    })

    return doctor
  }

  async create(firstName: string, lastName: string, specialty: string) {
    const doctorRepo = dataSourse.getRepository(DoctorEntity)

    const doctor = new DoctorEntity()
    doctor.firstName = firstName
    doctor.lastName = lastName
    doctor.specialty = specialty

    const result = await doctorRepo.save(doctor)

    return result
  }

  async update(
    id: number,
    firstName: string,
    lastName: string,
    specialty: string
  ) {
    const doctorRepo = dataSourse.getRepository(DoctorEntity)

    const doctor = await doctorRepo.findOneBy({ id })
    doctor.firstName = firstName
    doctor.lastName = lastName
    doctor.specialty = specialty

    const result = await doctorRepo.save(doctor)

    return result
  }

  async delete(id: number) {
    const doctorRepo = dataSourse.getRepository(DoctorEntity)
    const result = await doctorRepo.delete(id)

    return result
  }

  convertFilter(filter: any) {
    const where: any = {}

    if (filter.firstName) {
      where.firstName = filter.firstName
    }

    if (filter.specialty) {
      where.specialty = filter.specialty
    }

    return where
  }
}

export const doctorService = new DoctorService()
