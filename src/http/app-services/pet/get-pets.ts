import { FastifyReply, FastifyRequest } from 'fastify'

export async function getPets(req: FastifyRequest, res: FastifyReply) {
  return res.code(200).send({ message: 'Pets' })
}
