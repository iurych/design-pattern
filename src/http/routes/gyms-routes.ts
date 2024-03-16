import { FastifyInstance } from 'fastify'
import { createGymsController } from '../controllers/gyns/create'
import { searchGymController } from '../controllers/gyns/search'
import { searchNearbyGymController } from '../controllers/gyns/search-nearby'
import { verifyJWT } from '../controllers/middlewares/virifyjwt'

export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)
  app.post('/gyms', createGymsController)
  app.get('/gyms/search', searchGymController)
  app.get('/gyms/nearby', searchNearbyGymController)
}
