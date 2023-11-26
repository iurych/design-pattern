import { UserRepository } from '@/repositories/users-repository'
import type { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUser {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRespository: UserRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUser): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const checkUniqueEmail = await this.usersRespository.findByEmail(email)

    if (checkUniqueEmail) {
      throw new UserAlreadyExistsError()
    }

    // inversão de dependência
    const user = await this.usersRespository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
