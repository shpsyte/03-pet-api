import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExists } from '@/error/user-already-exists'
import { makeRegisterService } from '@/services/factories/make-register-service'
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
    password: z.string(),
  })

  const { ...org } = registerUserSchema.parse(request.body)

  try {
    const registerUserService = makeRegisterService()

    const user = await registerUserService.execute({ ...org })

    return user
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
