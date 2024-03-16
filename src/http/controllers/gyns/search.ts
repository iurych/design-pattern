import { searchGymQuerySchema } from '@/schema/gym'
import { makeSearchGymUseCase } from '@/use-cases/factories/make-search-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export const searchGymController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  // valida os dados recebidos pela request
  const { search, page } = searchGymQuerySchema.parse(request.query)

  const searchGymUseCase = makeSearchGymUseCase()

  const { gyms } = await searchGymUseCase.execute({
    search,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
