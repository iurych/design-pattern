import { getDistanceBetweenCoordinates } from '@/utils/get-distance-btw-coor'
import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { FindManyNearbyParams, GymsRepository } from '../gym-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.items.push(gym)

    return gym
  }

  async searchMany(search: string, page: number) {
    const filteredItems = this.items
      .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
      .slice((page - 1) * 20, page * 20)

    return filteredItems
  }

  async findManyGymsNearby(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }
}
