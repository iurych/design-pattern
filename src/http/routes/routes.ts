import { registerUserController } from '@/http/controllers/register-controller'
import { FastifyInstance } from 'fastify'
import { authenticateUserController } from '../controllers/authenticate-controller'
import { verifyJWT } from '../controllers/middleware/virifyjwt'
import { profileUserController } from '../controllers/profile-controller'

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', registerUserController)
  app.post('/sessions', authenticateUserController)
  app.get('/profile', { onRequest: [verifyJWT] }, profileUserController)
}
