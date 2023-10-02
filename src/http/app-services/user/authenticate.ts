import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaOrganizationRepository } from '@/repositories/prisma-user-repository'
import { AuthenticateService } from '@/services/users/authenticate'
import { AuthError } from '@/error/autheticate-error'
export async function authenticateUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerUserSchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const { ...org } = registerUserSchema.parse(request.body)

  try {
    const repository = new PrismaOrganizationRepository()
    const service = new AuthenticateService(repository)

    const response = await service.execute({ ...org })

    return reply.code(200).send(response)
  } catch (error) {
    if (error instanceof AuthError) {
      return reply.code(401).send({
        message: 'Email or password incorrect',
      })
    }
    throw error
  }
}
