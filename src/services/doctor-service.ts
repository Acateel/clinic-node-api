import { SelectQueryBuilder } from 'typeorm'
import { dataSourse } from '../database/data-sourse'
import { DoctorEntity } from '../database/entity/doctor-entity'
import { AppointmentEntity } from '../database/entity/appointment-entity'
import { validDto, validateDto } from '../util/validate-decorators'
import { CreateDoctorDto } from '../dto/doctor/create-doctor-dto'
import { UpdateDoctorDto } from '../dto/doctor/update-doctor-dto'

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

  @validateDto
  async create(@validDto doctorDto: CreateDoctorDto) {
    const doctorRepo = dataSourse.getRepository(DoctorEntity)

    const doctor = new DoctorEntity()
    doctor.firstName = doctorDto.firstName
    doctor.lastName = doctorDto.lastName
    doctor.specialty = doctorDto.specialty

    const result = await doctorRepo.save(doctor)

    return result
  }

  @validateDto
  async update(@validDto doctorDto: UpdateDoctorDto) {
    const doctorRepo = dataSourse.getRepository(DoctorEntity)

    const doctor = await doctorRepo.findOneBy({ id: doctorDto.id })
    doctor.firstName = doctorDto.firstName
    doctor.lastName = doctorDto.lastName
    doctor.specialty = doctorDto.specialty

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

    // filter by first name and specialty

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

    // filter by ids

    if (filter.ids) {
      const parsedIds = JSON.parse(filter.ids)
      filteredQuery = filteredQuery.andWhere('doctor.id IN (:...ids)', {
        ids: parsedIds,
      })
    }

    // pagination

    if (filter.page && filter.pageSize) {
      filteredQuery = filteredQuery
        .skip((filter.page - 1) * filter.pageSize)
        .take(filter.pageSize)
    }

    return filteredQuery
  }
}

export const doctorService = new DoctorService()
