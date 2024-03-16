import { requestGymBodySchema } from '@/schema/gym'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export const createGymsController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  // valida os dados recebidos pela request
  const { title, description, latitude, longitude, phone } =
    requestGymBodySchema.parse(request.body)

  const createGymUseCase = makeCreateGymUseCase()

  await createGymUseCase.execute({
    title,
    description,
    latitude,
    longitude,
    phone,
  })

  return reply.status(201).send()
}
