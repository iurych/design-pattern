import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUser {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRespository: any) {}

  async execute({ email, name, password }: RegisterUser) {
    const password_hash = await hash(password, 6)

    // verificar se email já existe
    const checkUniqueEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (checkUniqueEmail) {
      throw new Error('Email already in use!')
    }

    // cria o usuário no banco de dados
    // const prismaUserRepository = new PrismaUsersRepository()

    // inversão de dependência
    await this.usersRespository.create({
      name,
      email,
      password_hash,
    })
  }
}
