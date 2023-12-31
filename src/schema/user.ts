import { z } from 'zod'

export const requestBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
