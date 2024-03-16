import { makeGetUserNumberOfCheckInsUseCase } from '@/use-cases/factories/make-get-user-number-of-check-ins-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export const metricsController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const metricsUserCheckInsUseCase = makeGetUserNumberOfCheckInsUseCase()

  const { numberOfCheckIns } = await metricsUserCheckInsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    numberOfCheckIns,
  })
}
