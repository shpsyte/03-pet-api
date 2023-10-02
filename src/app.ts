import fastify from 'fastify'
import { userRoutes } from './http/app-services/user/route'
import { petRoutes } from './http/app-services/pet/route'
import { ZodError } from 'zod'
import { env } from './env'
const app = fastify()

app.register(userRoutes, { prefix: '/user' })
app.register(petRoutes, { prefix: '/pet' })

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.code(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(`💀 error 
                      message: ${error.message}
                      stack: ${error.stack}
    `)
  } else {
    // must log error in a log service
  }

  reply.code(500).send({
    message: 'Internal server error',
  })
})

export { app }
