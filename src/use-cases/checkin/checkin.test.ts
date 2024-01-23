import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/on-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './checkIn'

let checkInRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryUsersRepository
let sut: CheckInUseCase

describe('CheckIn Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemoryUsersRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Ginásio Teste',
      phone: '',
      description: 'Descrição do Ginásio Teste',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('it should be able to check-in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.8739733,
      userLongitude: -43.3584274,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('it should not be able to do two or more check-ins at the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.8739733,
      userLongitude: -43.3584274,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -22.8739733,
        userLongitude: -43.3584274,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('it should be able to check-ins in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.8739733,
      userLongitude: -43.3584274,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.8739733,
      userLongitude: -43.3584274,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
})
