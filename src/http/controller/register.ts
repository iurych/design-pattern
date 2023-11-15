import { prisma } from '@/lib/prisma'
import { requestBodySchema } from '@/schema/user'
import { FastifyReply, FastifyRequest } from 'fastify'

export const registerUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  // valida os dados recebidos pela request
  const { email, name, password } = requestBodySchema.parse(request.body)

  // cria o usuário no banco de dados
  await prisma.user.create({
    data: {
      email,
      name,
      password_hash: password,
    },
  })

  // retorna a resposta do banco de dados
  return reply.status(201).send()
}
