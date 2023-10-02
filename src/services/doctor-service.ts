import { dataSourse } from '../database/data-sourse'
import { DoctorEntity } from '../database/entity/doctor-entity'

class DoctorService {
  async get() {
    const doctorRepo = dataSourse.getRepository(DoctorEntity)
    const doctors = await doctorRepo.find()

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
    const doctor = doctorRepo.create({ firstName, lastName, specialty })
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
    doctorRepo.merge(doctor, { firstName, lastName, specialty })
    const result = await doctorRepo.save(doctor)

    return result
  }

  async delete(id: number) {
    const doctorRepo = dataSourse.getRepository(DoctorEntity)
    const result = await doctorRepo.delete(id)

    return result
  }
}

export const doctorService = new DoctorService()
