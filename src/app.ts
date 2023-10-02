import fastify from 'fastify'
import { userRoutes } from './http/controllers/user/route'
import { petRoutes } from './http/controllers/pet/route'
const app = fastify()

app.register(userRoutes, { prefix: '/user' })
app.register(petRoutes, { prefix: '/pet' })

export { app }
