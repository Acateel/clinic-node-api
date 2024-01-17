import { dataSourse } from '../database/data-sourse'
import { PatientEntity } from '../database/entity/patient-entity'
import { CreatePatientDto } from '../dto/patient/create-patient-dto'
import { UpdatePatientDto } from '../dto/patient/update-patient-dto'
import { formatPhoneNumber } from '../util/format-phone-number'
import { validDto, validateDto } from '../util/validate-decorators'

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

  @validateDto
  async create(@validDto patientDto: CreatePatientDto) {
    const patientRepo = dataSourse.getRepository(PatientEntity)

    const patient = new PatientEntity()
    patient.firstName = patientDto.firstName
    patient.lastName = patientDto.lastName
    patient.phoneNumber = formatPhoneNumber(patientDto.phoneNumber)

    const result = await patientRepo.save(patient)

    return result
  }

  @validateDto
  async update(@validDto patientDto: UpdatePatientDto) {
    const patientRepo = dataSourse.getRepository(PatientEntity)

    const patient = await patientRepo.findOneBy({ id: patientDto.id })
    patient.firstName = patientDto.firstName
    patient.lastName = patientDto.lastName
    patient.phoneNumber = formatPhoneNumber(patientDto.phoneNumber)

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
