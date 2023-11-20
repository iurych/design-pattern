import { UserRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUser {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRespository: UserRepository) {}

  async execute({ email, name, password }: RegisterUser) {
    const password_hash = await hash(password, 6)

    const checkUniqueEmail = await this.usersRespository.findByEmail(email)

    if (checkUniqueEmail) {
      throw new UserAlreadyExistsError()
    }

    // inversão de dependência
    await this.usersRespository.create({
      name,
      email,
      password_hash,
    })
  }
}
