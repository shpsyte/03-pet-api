import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterOrganizationService } from '@/services/users/register-user-services'
import { PrismaOrganizationRepository } from '@/repositories/prisma-user-repository'
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

  const { ...org } = registerUserSchema.parse(request.body)

  try {
    const prismaRepository = new PrismaOrganizationRepository()
    const registerUserService = new RegisterOrganizationService(
      prismaRepository,
    )

    const user = await registerUserService.execute({ ...org })

    return user
  } catch (error) {
    return reply.send({ message: error })
  }
}