import { FastifyInstance } from 'fastify'
import { getPets } from './get-pets'

export async function petRoutes(app: FastifyInstance) {
  app.get('/all', getPets)
}
