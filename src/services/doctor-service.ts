import { SelectQueryBuilder } from 'typeorm'
import { dataSourse } from '../database/data-sourse'
import { DoctorEntity } from '../database/entity/doctor-entity'
import { AppointmentEntity } from '../database/entity/appointment-entity'

class DoctorService {
  async get(filter: any) {
    const doctorRepo = dataSourse.getRepository(DoctorEntity)

    const doctorsQuery = doctorRepo
      .createQueryBuilder('doctor')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(appointment.id)', 'appointmentsCount')
          .from(AppointmentEntity, 'appointment')
          .where('appointment.doctor.id = doctor.id')
      }, 'appointmentsCount')
      .orderBy('"appointmentsCount"', 'DESC')

    const doctors: any[] = await this.convertToFilteredQuery(
      doctorsQuery,
      filter
    ).getMany()

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

  convertToFilteredQuery(query: SelectQueryBuilder<DoctorEntity>, filter: any) {
    let filteredQuery = query

    if (filter.firstName) {
      filteredQuery = filteredQuery.andWhere('doctor.firstName = :firstName', {
        firstName: filter.firstName,
      })
    }

    if (filter.specialty) {
      filteredQuery = filteredQuery.andWhere('doctor.specialty = :specialty', {
        specialty: filter.specialty,
      })
    }

    return filteredQuery
  }
}

export const doctorService = new DoctorService()
