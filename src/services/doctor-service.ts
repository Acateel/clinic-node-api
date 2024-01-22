import { dataSourse } from '../database/data-sourse'
import { DoctorEntity } from '../database/entity/doctor-entity'
import { validDto, validateDto } from '../util/validate-decorators'
import { CreateDoctorDto } from '../dto/doctor/create-doctor-dto'
import { UpdateDoctorDto } from '../dto/doctor/update-doctor-dto'

class DoctorService {
  async get(filter: any) {
    const doctorRepo = dataSourse.getRepository(DoctorEntity)

    let doctorsQuery = doctorRepo
      .createQueryBuilder('doctor')
      .addSelect('count(appointment_entity.id)', 'app_count')
      .leftJoin('doctor.appointments', 'appointment_entity')
      .groupBy('doctor.id')
      .addOrderBy('app_count', 'DESC')

    if (filter.firstName) {
      doctorsQuery = doctorsQuery.andWhere('doctor.firstName = :firstName', {
        firstName: filter.firstName,
      })
    }

    if (filter.specialty) {
      doctorsQuery = doctorsQuery.andWhere('doctor.specialty = :specialty', {
        specialty: filter.specialty,
      })
    }

    if (filter.ids) {
      const parsedIds = JSON.parse(filter.ids)
      doctorsQuery = doctorsQuery.andWhere('doctor.id IN (:...ids)', {
        ids: parsedIds,
      })
    }

    if (filter.page && filter.pageSize) {
      doctorsQuery = doctorsQuery
        .skip((filter.page - 1) * filter.pageSize)
        .take(filter.pageSize)
    }

    const doctors: any[] = await doctorsQuery.getMany()

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
}

export const doctorService = new DoctorService()
