import { registerUserController } from '@/http/controllers/users/register'
import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../controllers/middlewares/virifyjwt'
import { authenticateUserController } from '../controllers/users/authenticate'
import { profileUserController } from '../controllers/users/profile'

export const usersRoutes = async (app: FastifyInstance) => {
  app.post('/users', registerUserController)
  app.post('/sessions', authenticateUserController)

  /** Authtenticated */
  app.get('/profile', { onRequest: [verifyJWT] }, profileUserController)
}
