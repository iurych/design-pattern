import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { authenticateBodySchema } from '@/schema/user'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'

export const authenticateUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const authenticateUserCase = new AuthenticateUseCase(usersRepository) // instancio a classe passando por parâmetro as dependências

    await authenticateUserCase.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }

  return reply.status(200).send()
}
