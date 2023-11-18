import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUser {
  name: string
  email: string
  password: string
}

export const register = async ({ email, name, password }: RegisterUser) => {
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
  await prisma.user.create({
    data: {
      email,
      name,
      password_hash,
    },
  })
}
