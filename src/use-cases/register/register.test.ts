import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('it should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe5@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should hash the password after register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe5@example.com',
      password: '123456',
    })

    const isPWDHashed = await compare('123456', user.password_hash)

    expect(isPWDHashed).toBe(true)
  })

  it('Should not be able to register same email', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
