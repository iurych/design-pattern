import type { Gym } from '@prisma/client'
import { GymsRepository } from './../../repositories/gym-repository'

interface searchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface searchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: searchNearbyGymsUseCaseRequest): Promise<searchNearbyGymsUseCaseResponse> {
    // inversão de dependência
    const gyms = await this.gymsRepository.findManyGymsNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
