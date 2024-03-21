import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'
import { InvalidCheckInAfter20Minutes } from '../errors/invalid-check0in-after-20-minutes'
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

    const twentyOnyMinutesOfDiferenceInCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (twentyOnyMinutesOfDiferenceInCheckInCreation > 20) {
      throw new InvalidCheckInAfter20Minutes()
    }

    checkIn.validated_at = new Date() // como estou alterando um dado do checkIn, eu preciso salvar no banco de dados com o método save()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
