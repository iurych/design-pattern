import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from '../authenticate/authenticate'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Get User profile use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('it should be possible to get a user profile', async () => {
    
    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('it should not be able to get a user profile with wrong id', async () => {
    expect(async () => {
      await sut.execute({
        email: 'johnd@example.com',
        password: '1234',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('it should be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    expect(async () => {
      await sut.execute({
        email: 'johnd@example.com',
        password: '1234234',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
