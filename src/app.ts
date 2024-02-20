import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env'
import { errorHandler } from './error'
import { appRoutes } from './http/routes/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(appRoutes)

app.setErrorHandler(errorHandler)
