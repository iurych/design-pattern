import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchNearbyGymsUseCase } from './search-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchNearbyGymsUseCase

describe('Search gym nearby use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchNearbyGymsUseCase(gymsRepository)
  })

  it('it should be able to search for near gyms', async () => {
    await gymsRepository.create({
      title: 'Near gym',
      description: null,
      phone: null,
      latitude: -22.8739733,
      longitude: -43.3584274,
    })
    await gymsRepository.create({
      title: 'Far gym',
      description: null,
      phone: null,
      latitude: -22.6343319,
      longitude: -43.1964332,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.8739733,
      userLongitude: -43.3584274,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near gym' })])
  })
})
