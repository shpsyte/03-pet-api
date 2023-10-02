import { FastifyInstance } from 'fastify'
import { getUsers } from './get-user'
import { registerUser } from './register'

export async function userRoutes(app: FastifyInstance) {
  app.get('/all', getUsers)
  app.post('/register', registerUser)
}
