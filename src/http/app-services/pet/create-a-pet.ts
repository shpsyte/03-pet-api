import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makePetRegisterService } from '@/services/factories/make-pet-create-service'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerSchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    energy: z.string(),
    indepence: z.string(),
    environment: z.string(),
    org_id: z.string(),
  })

  const { ...data } = registerSchema.parse(request.body)

  const service = makePetRegisterService()

  const pet = await service.execute({
    about: data.about,
    age: data.age as any,
    energy: data.energy as any,
    environment: data.environment as any,
    indepence: data.indepence as any,
    name: data.name,
    org_id: data.org_id,
  })

  return reply.status(201).send(pet)
}
