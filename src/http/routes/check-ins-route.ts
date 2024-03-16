import { FastifyInstance } from 'fastify'
import { createCheckInsController } from '../controllers/check-ins/create'
import { historyController } from '../controllers/check-ins/history'
import { metricsController } from '../controllers/check-ins/metrics'
import { validateController } from '../controllers/check-ins/validate'
import { verifyJWT } from '../controllers/middlewares/virifyjwt'

export const checkInsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)
  app.get('check-ins/history', historyController)
  app.get('check-ins/metrics', metricsController)
  app.post('/gyms/:gymsId/check-ins', createCheckInsController)
  app.patch('/check-ins/:checkInId/validate', validateController)
}
