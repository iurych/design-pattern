import { searchNearbyGymQuerySchema } from '@/schema/gym'
import { makeSearchNearbyGymUseCase } from '@/use-cases/factories/make-search-nearby-gym'
import { FastifyReply, FastifyRequest } from 'fastify'

export const searchNearbyGymController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  // valida os dados recebidos pela request
  const { latitude, longitude } = searchNearbyGymQuerySchema.parse(
    request.query,
  )

  const searchNearbyGymUseCase = makeSearchNearbyGymUseCase()

  const { gyms } = await searchNearbyGymUseCase.execute({
    userLongitude: longitude,
    userLatitude: latitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
