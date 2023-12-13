import { registerUserController } from '@/http/controller/register-controller'
import { FastifyInstance } from 'fastify'
import { authenticateUserController } from '../controller/authenticate-controller'

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', registerUserController)
  app.post('/sessions', authenticateUserController)
}
