import { UserAlreadyExists } from '@/error/user-already-exists'
import { prisma } from '@/lib/primsa'
import { hash } from 'bcryptjs'

type RegisterUser = {
  name: string
  email: string
  zipcode: string
  address: string
  whatsapp: string
  password_hash: string
}

export async function registerUserService({ ...user }: RegisterUser) {
  user.password_hash = await hash(user.password_hash, 6)

  // check if user already exists
  const userAlreadyExists = await prisma.org.findUnique({
    where: {
      email: user.email,
    },
  })

  if (userAlreadyExists) {
    throw new UserAlreadyExists(`This email ${user.email} already exists`)
  }

  await prisma.org.create({
    data: {
      ...user,
    },
  })
}
