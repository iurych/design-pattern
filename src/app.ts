import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env'
import { errorHandler } from './error'
import { gymsRoutes } from './http/routes/gyms-routes'
import { usersRoutes } from './http/routes/users-routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(usersRoutes)
app.register(gymsRoutes)

app.setErrorHandler(errorHandler)
