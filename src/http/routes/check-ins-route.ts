import { FastifyInstance } from 'fastify'
import { searchGymController } from '../controllers/gyns/search'
import { searchNearbyGymController } from '../controllers/gyns/search-nearby'
import { verifyJWT } from '../controllers/middlewares/virifyjwt'

export const checkInsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)
  app.get('/gyms/search', searchGymController)
  app.get('/gyms/nearby', searchNearbyGymController)
}
