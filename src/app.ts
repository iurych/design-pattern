import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const app = fastify()
const prisma = new PrismaClient()
// ORM - Object Relational Mapper
prisma.user.create({
  data: {
    email: 'iury.vibe@gmail.com',
    name: 'iury chiganer',
  },
})
