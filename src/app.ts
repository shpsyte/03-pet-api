import fastify from 'fastify'
import { userRoutes } from './http/app-services/user/route'
import { petRoutes } from './http/app-services/pet/route'
import { ZodError } from 'zod'
import { env } from './env'
import { AuthError } from './error/autheticate-error'
import fastifyJwt from '@fastify/jwt'

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(userRoutes, { prefix: '/user' })
app.register(petRoutes, { prefix: '/pet' })

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.code(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (error instanceof AuthError) {
    return reply.code(401).send({
      message: 'Email or password incorrect',
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
