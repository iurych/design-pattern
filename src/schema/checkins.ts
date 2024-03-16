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

export const checkInHistoryQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
})

export const validateCheckInParamsSchema = z.object({
  checkInId: z.string().uuid(),
})
