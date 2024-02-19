import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidadeUseCase } from '../checkin/validate'

export const makeValidateUseCase = () => {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidadeUseCase(checkInsRepository)

  return useCase
}
