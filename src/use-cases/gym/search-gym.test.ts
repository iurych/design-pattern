import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymUseCase } from './search-gym'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search gym use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('it should be able to search a gym', async () => {
    await gymsRepository.create({
      title: 'Javascript gym',
      description: null,
      phone: null,
      latitude: -22.8739733,
      longitude: -43.3584274,
    })
    await gymsRepository.create({
      title: 'Typescript gym',
      description: null,
      phone: null,
      latitude: -22.8739733,
      longitude: -43.3584274,
    })

    const { gyms } = await sut.execute({
      search: 'typescript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Typescript gym' })])
  })

  it('it should be able to search gyms with pagination', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Typescript gym ${i}`,
        description: null,
        phone: null,
        latitude: -22.8739733,
        longitude: -43.3584274,
      })
    }

    const { gyms } = await sut.execute({
      search: 'Typescript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Typescript gym 21' }),
      expect.objectContaining({ title: 'Typescript gym 22' }),
    ])
  })
})
