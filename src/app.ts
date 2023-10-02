import fastify from 'fastify'
import { userRoutes } from './http/app-services/user/route'
import { petRoutes } from './http/app-services/pet/route'
const app = fastify()

app.register(userRoutes, { prefix: '/user' })
app.register(petRoutes, { prefix: '/pet' })

export { app }
