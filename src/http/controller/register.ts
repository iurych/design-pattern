import { requestBodySchema } from '@/schema/user'
import { register } from '@/use-case/register'
import { FastifyReply, FastifyRequest } from 'fastify'

export const registerUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  // valida os dados recebidos pela request
  const { email, name, password } = requestBodySchema.parse(request.body)

  try {
    await register({ email, name, password })
  } catch (error) {
    return reply.status(409).send()
  }
  // retorna a resposta do banco de dados
  return reply.status(201).send()
}
