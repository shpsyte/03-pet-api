import { FastifyInstance } from 'fastify'
import { getUser } from './get-user'
import { registerUser } from './register'
import { authenticateUser } from './authenticate'
import { auth } from '@/middleware/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
  app.post('/register', registerUser)
  app.post('/auth', authenticateUser)
  app.get(
    '/current',
    {
      onRequest: [auth],
    },
    getUser,
  )
}
