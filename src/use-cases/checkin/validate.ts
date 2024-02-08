import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-btw-coor'
import { CheckIn } from '@prisma/client'
import { MaxDistanceError } from '../errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '../errors/max-number-of-check-ins-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ValidadeUseCaseRequest {
  checkInId: string
}

interface ValidadeUseCaseResponse {
  checkIn: CheckIn
}

export class ValidadeUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidadeUseCaseRequest): Promise<ValidadeUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validated_at = new Date() // como estou alterando um dado do checkIn, eu preciso salvar no banco de dados

    return {
      checkIn,
    }
  }
}
