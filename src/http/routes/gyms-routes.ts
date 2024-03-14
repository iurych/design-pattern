import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../controllers/middlewares/virifyjwt'

export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)
}
