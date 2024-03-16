import { z } from 'zod'

export const checkinsParamsSchema = z.object({
  gymId: z.string().uuid(),
})

export const requestCheckInsBodySchema = z.object({
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})
