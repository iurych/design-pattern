import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
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
    const gyms = await prisma.gym.findMany({
      where: {
        latitude: {
          gte: latitude,
          lte: latitude,
        },
        longitude: {
          gte: longitude,
          lte: longitude,
        },
      },
    })
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