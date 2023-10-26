import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm'
import { dataSourse } from '../database/data-sourse'
import { DoctorScheduleEntity } from '../database/entity/doctor-schedule-entity'

class DoctorScheduleService {
  async get() {
    const scheduleRepo = dataSourse.getRepository(DoctorScheduleEntity)
    const schedules = await scheduleRepo.find()
    return schedules
  }

  async getByDoctorId(doctorId: number) {
    const scheduleRepo = dataSourse.getRepository(DoctorScheduleEntity)
    const schedules = await scheduleRepo.findBy({ doctor: { id: doctorId } })
    return schedules
  }

  async getById(id: number) {
    const scheduleRepo = dataSourse.getRepository(DoctorScheduleEntity)
    const schedule = await scheduleRepo.findOneBy({ id })
    return schedule
  }

  async create(doctorId: number, startTime: Date, endTime: Date) {
    const scheduleRepo = dataSourse.getRepository(DoctorScheduleEntity)
    const schedule = scheduleRepo.create({
      doctor: { id: doctorId },
      startTime,
      endTime,
    })
    const result = await scheduleRepo.save(schedule)
    return result
  }

  async update(id: number, doctorId: number, startTime: Date, endTime: Date) {
    const scheduleRepo = dataSourse.getRepository(DoctorScheduleEntity)
    const schedule = await scheduleRepo.findOneBy({ id })
    scheduleRepo.merge(schedule, {
      doctor: { id: doctorId },
      startTime,
      endTime,
    })

    const result = await scheduleRepo.save(schedule)
    return result
  }

  async delete(id: number) {
    const scheduleRepo = dataSourse.getRepository(DoctorScheduleEntity)
    const result = await scheduleRepo.delete(id)
    return result
  }

  async isTimesInSchedule(doctorId: number, startTime: Date, endTime: Date) {
    const scheduleRepo = dataSourse.getRepository(DoctorScheduleEntity)
    const schedule = await scheduleRepo.findOneBy({
      doctor: {
        id: doctorId,
      },
      startTime: LessThanOrEqual(startTime),
      endTime: MoreThanOrEqual(endTime),
    })
    if (schedule) {
      return true
    }
    return false
  }
}

export const doctorScheduleService = new DoctorScheduleService()
