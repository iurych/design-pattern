import { requestBodySchema } from '@/schema/user'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export const registerUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  // valida os dados recebidos pela request
  const { email, name, password } = requestBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ email, name, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    return reply.status(500).send() // TODO fix me
  }
  // retorna a resposta do banco de dados
  return reply.status(201).send()
}
