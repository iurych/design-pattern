import { PrismaUsersRepository } from '@/repositories/users-repository'
import { requestBodySchema } from '@/schema/user'
import { RegisterUseCase } from '@/use-cases/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { register } from 'module'

export const registerUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  // valida os dados recebidos pela request
  const { email, name, password } = requestBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const resgisterUserCase = new RegisterUseCase(prismaUsersRepository) // instancio a classe passando por parâmetro as dependências

    await resgisterUserCase.execute({ email, name, password })
  } catch (error) {
    return reply.status(409).send()
  }
  // retorna a resposta do banco de dados
  return reply.status(201).send()
}
