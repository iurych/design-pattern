import { FastifyInstance } from 'fastify'
import { createGymsController } from '../controllers/gyms/create'
import { searchGymController } from '../controllers/gyms/search'
import { searchNearbyGymController } from '../controllers/gyms/search-nearby'
import { verifyJWT } from '../controllers/middlewares/virifyjwt'

export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)
  app.post('/gyms', createGymsController)
  app.get('/gyms/search', searchGymController)
  app.get('/gyms/nearby', searchNearbyGymController)
}
