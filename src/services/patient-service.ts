import dataSourse from '../database/dataSourse'
import { Patient } from '../database/entity/patient.entity'

class PatientService {
  async get() {
    const patientRepo = dataSourse.getRepository(Patient)
    const patients = await patientRepo.find()

    return patients
  }

  async getById(id: number) {
    const patientRepo = dataSourse.getRepository(Patient)
    const patient = await patientRepo.findOneBy({
      id,
    })

    return patient
  }

  async create(firstName: string, lastName: string) {
    const patientRepo = dataSourse.getRepository(Patient)
    const patient = patientRepo.create({ firstName, lastName })
    const result = await patientRepo.save(patient)

    return result
  }

  async update(id: number, firstName: string, lastName: string) {
    const patientRepo = dataSourse.getRepository(Patient)
    const patient = await patientRepo.findOneBy({ id })
    patientRepo.merge(patient, { firstName, lastName })
    const result = await patientRepo.save(patient)

    return result
  }

  async delete(id: number) {
    const patientRepo = dataSourse.getRepository(Patient)
    const result = await patientRepo.delete(id)

    return result
  }
}

export default new PatientService()
