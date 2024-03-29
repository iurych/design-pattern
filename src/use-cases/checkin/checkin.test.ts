import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MaxDistanceError } from '../errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '../errors/max-number-of-check-ins-error'
import { CheckInUseCase } from './checkIn'

let checkInRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('CheckIn Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Ginásio Teste',
      phone: '',
      description: 'Descrição do Ginásio Teste',
      latitude: -22.8739733,
      longitude: -43.3584274,
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
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
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

  it('it should not be able to checkin far way from gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Ginásio Teste distância',
      phone: '',
      description: 'Descrição do Ginásio Teste distância',
      latitude: new Decimal(-22.913758),
      longitude: new Decimal(-43.220551),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -22.8739733,
        userLongitude: -43.3584274,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
