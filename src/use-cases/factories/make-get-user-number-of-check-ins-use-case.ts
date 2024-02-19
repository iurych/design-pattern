import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { CountUserCheckInsUseCase } from '../checkin/get-user-number-of-check-ins'

export const makeGetUserNumberOfCheckInsUseCase = () => {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new CountUserCheckInsUseCase(checkInsRepository)

  return useCase
}
