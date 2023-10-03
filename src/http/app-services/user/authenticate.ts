import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AuthError } from '@/error/autheticate-error'
import { makeAutheTicateService } from '@/services/factories/make-autheticate-service'
export async function authenticateUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerUserSchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const { ...org } = registerUserSchema.parse(request.body)

  try {
    const service = makeAutheTicateService()

    const {
      user: { email, id },
    } = await service.execute({ ...org })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: true,
      })
      .code(200)
      .send({
        user: {
          id,
          token,
        },
      })
  } catch (error) {
    if (error instanceof AuthError) {
      return reply.code(401).send({
        message: 'Email or password incorrect',
      })
    }
    throw error
  }
}
