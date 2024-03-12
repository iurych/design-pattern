import { registerUserController } from '@/http/controller/register-controller'
import { FastifyInstance } from 'fastify'
import { authenticateUserController } from '../controller/authenticate-controller'
import { verifyJWT } from '../controller/middleware/virifyjwt'
import { profileUserController } from '../controller/profile-controller'

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', registerUserController)
  app.post('/sessions', authenticateUserController)
  app.get('/profile', { onRequest: [verifyJWT] }, profileUserController)
}
