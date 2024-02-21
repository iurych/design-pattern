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

export const responseProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  created_at: z.date(),
  password_hash: z.string().optional(),
})
