import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env'
import { errorHandler } from './error'
import { checkInsRoutes } from './http/routes/check-ins-route'
import { gymsRoutes } from './http/routes/gyms-routes'
import { usersRoutes } from './http/routes/users-routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

/**
 * ROTAS DA APLICAÇÃO
 */
app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler(errorHandler)
