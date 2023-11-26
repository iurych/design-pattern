import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'

describe('Register Use Casse', () => {
  it('Should hash the password after register', async () => {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUserCase = new RegisterUseCase(prismaUsersRepository)

    const { user } = await registerUserCase.execute({
      name: 'John Doe',
      email: 'johndoe5@example.com',
      password: '123456',
    })

    const isPWDHashed = await compare('123456', user.password_hash)

    expect(isPWDHashed).resolves.toBe(true)
  })
})
