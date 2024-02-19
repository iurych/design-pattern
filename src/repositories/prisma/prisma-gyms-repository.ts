import { prisma } from '@/lib/prisma'
import { Gym, Prisma } from '@prisma/client'
import { FindManyNearbyParams, GymsRepository } from '../gym-repository'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })
    return gym
  }

  async findManyGymsNearby(params: FindManyNearbyParams) {
    const { latitude, longitude } = params
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gym
      WHERE
        earth_box(ll_to_earth(${latitude}, ${longitude}), 1000) @> ll_to_earth(latitude, longitude)
    `
    // SELECT * from gyms
    // WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10

    return gyms
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = prisma.gym.create({
      data,
    })
    return gym
  }

  async searchMany(search: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: search,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return gyms
  }
}
