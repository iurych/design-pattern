import { validateCheckInParamsSchema } from '@/schema/checkins'
import { makeValidateUseCase } from '@/use-cases/factories/make-validade-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export const validateController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  // valida os dados recebidos pela request
  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  // console.log('response: ', response)

  return reply.status(204).send()
}
