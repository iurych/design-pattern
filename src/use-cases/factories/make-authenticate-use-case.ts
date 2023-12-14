import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export const makeAuthenticateUseCase = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const AuthenticateUserCase = new AuthenticateUseCase(prismaUsersRepository)

  return AuthenticateUserCase
}
