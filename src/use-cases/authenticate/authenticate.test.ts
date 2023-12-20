import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { AuthenticateUseCase } from './authenticate'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('it should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('it should be able to authenticate with wrong email', async () => {
    expect(async () => {
      await sut.execute({
        email: 'johnd@example.com',
        password: '1234',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it.only('it should be able to authenticate with wrong password', async () => {
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
