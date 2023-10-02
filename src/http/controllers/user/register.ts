import { prisma } from '@/lib/primsa'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { registerUserService } from '@/services/users/register-user-services'
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

  try {
    const userCreated = await registerUserService({ ...user })
    return reply.code(201).send({ message: 'User created', userCreated })
  } catch (error) {
    return reply.send({ message: error })
  }
}
