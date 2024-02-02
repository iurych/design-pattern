// metrincs

import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface CountUserCheckInsUseCaseRequest {
  userId: string
}

interface CountUserCheckInsUseCaseResponse {
  numberOfCheckIns: number
}

export class CountUserCheckInsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: CountUserCheckInsUseCaseRequest): Promise<CountUserCheckInsUseCaseResponse> {
    const numberOfCheckIns =
      await this.checkInsRepository.countUserCheckInsById(userId)

    if (!numberOfCheckIns) {
      throw new ResourceNotFoundError()
    }

    return {
      numberOfCheckIns,
    }
  }
}
