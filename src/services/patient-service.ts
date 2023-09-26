import { Repository } from 'typeorm'
import dataSourse from '../database/dataSourse'
import { Patient } from '../database/entity/patient.entity'

class PatientService {
  private patientRepo: Repository<Patient>

  construtor() {
    this.patientRepo = dataSourse.getRepository(Patient)
  }

  async getAll() {
    const patients = await this.patientRepo.find()

    return patients
  }

  async getById(id: string) {
    const patient = await this.patientRepo.findOneBy({
      id,
    })

    return patient
  }

  async createOne(firstName: string, lastName: string) {
    const patient = await this.patientRepo.create({ firstName, lastName })
    const result = await this.patientRepo.save(patient)

    return result
  }

  async updateById(id: string, firstName: string, lastName: string) {
    const patient = await this.patientRepo.findOneBy({ id })
    this.patientRepo.merge(patient, { firstName, lastName })
    const result = await this.patientRepo.save(patient)

    return result
  }

  async deleteById(id: string) {
    const result = await this.patientRepo.delete(id)

    return result
  }
}

export default new PatientService()
