import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'

export const errorHandler = (
  error: Error,
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: error.flatten().fieldErrors })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: have to log to an external tool like Datalog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
}
