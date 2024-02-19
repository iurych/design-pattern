import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchNearbyGymsUseCase } from '../gym/search-nearby-gyms'

export const makeSearchNearbyGymUseCase = () => {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchNearbyGymsUseCase(gymsRepository)

  return useCase
}
