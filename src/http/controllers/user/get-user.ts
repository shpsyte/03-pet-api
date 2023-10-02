import { FastifyReply, FastifyRequest } from 'fastify'

export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
  return reply.code(200).send({ hello: 'world' })
}
