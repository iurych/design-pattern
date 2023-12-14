import fastify from 'fastify'
import { errorHandler } from './error'
import { appRoutes } from './http/routes/routes'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler(errorHandler)
