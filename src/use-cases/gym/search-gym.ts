import type { Gym } from '@prisma/client'
import { GymsRepository } from './../../repositories/gym-repository'

interface searchGymUseCaseRequest {
  search: string
  page: number
}

interface searchGymUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    search,
    page,
  }: searchGymUseCaseRequest): Promise<searchGymUseCaseResponse> {
    // inversão de dependência
    const gyms = await this.gymsRepository.searchMany(search, page)

    return {
      gyms,
    }
  }
}
