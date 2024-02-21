import { responseProfileSchema } from '@/schema/user'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const profileUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<z.infer<typeof responseProfileSchema>> => {
  await request.jwtVerify()

  const getUserProfile = makeGetUserProfileUseCase()
  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  const userWithoutPassword = responseProfileSchema.parse(user)
  delete userWithoutPassword.password_hash

  return reply.status(200).send({
    userWithoutPassword,
  })
}
