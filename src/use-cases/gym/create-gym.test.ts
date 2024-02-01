import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create a gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('it should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Academia de javascript',
      description: null,
      phone: null,
      latitude: -22.8739733,
      longitude: -43.3584274,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
