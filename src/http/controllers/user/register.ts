import { prisma } from '@/lib/primsa'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerUserSchema = z.object({
    name: z.string(),
    email: z.string(),
    zipcode: z.string().max(8),
    address: z.string(),
    whatsapp: z.string(),
    password_hash: z.string(),
  })

  const { ...user } = registerUserSchema.parse(request.body)

  await prisma.org.create({
    data: {
      ...user,
    },
  })

  return reply.code(201).send({ message: 'User created', user })
}
