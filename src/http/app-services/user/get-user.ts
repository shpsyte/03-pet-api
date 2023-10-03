import { makeRegisterService } from '@/services/factories/make-register-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  console.log('request.user', request.cookies)
  const registerUserService = makeRegisterService()

  const id = request.user.sub

  const user = await registerUserService.getCurrentuser(id)
  const userRes = { ...user } as Partial<typeof user>

  if (!userRes) {
    reply.code(404).send({
      message: 'User not found',
    })
  }

  delete userRes?.password
  return userRes
}
