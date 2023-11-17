import { dataSourse } from '../database/data-sourse'
import { PatientEntity } from '../database/entity/patient-entity'

class PatientService {
  async get() {
    const patientRepo = dataSourse.getRepository(PatientEntity)
    const patients = await patientRepo.find()

    return patients
  }

  async getById(id: number) {
    const patientRepo = dataSourse.getRepository(PatientEntity)
    const patient = await patientRepo.findOneBy({
      id,
    })

    return patient
  }

  async create(firstName: string, lastName: string, phoneNumber: string) {
    const patientRepo = dataSourse.getRepository(PatientEntity)

    const patient = new PatientEntity()
    patient.firstName = firstName
    patient.lastName = lastName
    patient.phoneNumber = phoneNumber

    const result = await patientRepo.save(patient)

    return result
  }

  async update(
    id: number,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) {
    const patientRepo = dataSourse.getRepository(PatientEntity)

    const patient = await patientRepo.findOneBy({ id })
    patient.firstName = firstName
    patient.lastName = lastName
    patient.phoneNumber = phoneNumber

    const result = await patientRepo.save(patient)

    return result
  }

  async delete(id: number) {
    const patientRepo = dataSourse.getRepository(PatientEntity)
    const result = await patientRepo.delete(id)

    return result
  }
}

export const patientService = new PatientService()
