import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register'

describe('Register Use Case', () => {
  it('it should be able to register', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUserCase = new RegisterUseCase(userRepository)

    const { user } = await registerUserCase.execute({
      name: 'John Doe',
      email: 'johndoe5@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should hash the password after register', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUserCase = new RegisterUseCase(userRepository)

    const { user } = await registerUserCase.execute({
      name: 'John Doe',
      email: 'johndoe5@example.com',
      password: '123456',
    })

    const isPWDHashed = await compare('123456', user.password_hash)

    expect(isPWDHashed).toBe(true)
  })

  it('Should not be able to register same email', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUserCase = new RegisterUseCase(userRepository)

    const email = 'johndoe@example.com'

    await registerUserCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerUserCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
