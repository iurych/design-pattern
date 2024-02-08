import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { ValidadeUseCase } from './validate'

let checkInRepository: InMemoryCheckInRepository
let sut: ValidadeUseCase

describe('Validate check-in Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new ValidadeUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('it should be able to validate an user check-in', async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('it should not be able to validate an non-existente check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'non-existent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('it should not be able to validate a check-in after 20 minutes', async () => {
    vi.setSystemTime(new Date(2024, 1, 8, 40))

    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs) // Add 21 minutes in the system time

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
