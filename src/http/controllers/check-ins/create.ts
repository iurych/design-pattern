import {
  checkinsParamsSchema,
  requestCheckInsBodySchema,
} from '@/schema/checkins'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export const createCheckInsController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { gymId } = checkinsParamsSchema.parse(request.params)
  const { latitude, longitude } = requestCheckInsBodySchema.parse(request.body)

  const createCheckInsUseCase = makeCheckInUseCase()

  await createCheckInsUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
