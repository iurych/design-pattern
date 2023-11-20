import { registerUserController } from '@/http/controller/register-controller'
import { FastifyInstance } from 'fastify'

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', registerUserController)
}
