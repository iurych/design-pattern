import { FastifyInstance } from 'fastify'
import request from 'supertest'

export const authUserToken = async (app: FastifyInstance) => {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johnexample@example.com',
    password: '123456',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johnexample@example.com',
    password: '123456',
  })
  const { token } = authResponse.body

  return { token }
}
