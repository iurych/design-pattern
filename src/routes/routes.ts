import { FastifyInstance } from 'fastify'
import { registerUserController } from '@/http/controller/register'

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', registerUserController)
}
