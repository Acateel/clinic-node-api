import { dataSourse } from '../database/data-sourse'
import { PatientEntity } from '../database/entity/patient-entity'
import { formatPhoneNumber } from '../util/format-phone-number'

class PatientService {
  async get(filter: any) {
    const patientRepo = dataSourse.getRepository(PatientEntity)
    const patients = await patientRepo.findBy(this.convertFilter(filter))

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

  convertFilter(filter: any) {
    const where: any = {}

    if (filter.firstName) {
      where.firstName = filter.firstName
    }

    if (filter.phoneNumber && formatPhoneNumber(filter.phoneNumber)) {
      where.phoneNumber = formatPhoneNumber(filter.phoneNumber)
    }

    return where
  }
}

export const patientService = new PatientService()
