import { FastifyInstance } from 'fastify'
import { createGymsController } from '../controllers/gyms/create'
import { searchGymController } from '../controllers/gyms/search'
import { searchNearbyGymController } from '../controllers/gyms/search-nearby'
import { verifyUserRole } from '../controllers/middlewares/verify-user-role'
import { verifyJWT } from '../controllers/middlewares/virifyjwt'

export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)
  app.get('/gyms/search', searchGymController)
  app.get('/gyms/nearby', searchNearbyGymController)

  app.post(
    '/gyms',
    { onRequest: [verifyUserRole('ADMIN')] },
    createGymsController,
  )
}
