import { InMemoryUserRepository } from '@/repositories/in-memory-user-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { AuthenticateService } from '@/services/users/authenticate'

describe('Register user Case ', () => {
  let repo: InMemoryUserRepository
  let sut: AuthenticateService

  beforeEach(async () => {
    repo = new InMemoryUserRepository()
    sut = new AuthenticateService(repo)
    repo.users.push({
      address: 'Rua teste',
      email: 'jose@jose.com',
      name: 'teste',
      password: await hash('123456', 6),
      whatsapp: '123456',

      zipcode: '123456',
    })
  })

  it('should be to authenticate', async () => {
    const response = await sut.execute({
      email: 'jose@jose.com',
      password: '123456',
    })

    expect(response.user).toEqual({
      name: 'teste',
      email: 'jose@jose.com',
    })
  })

  it('should be to not authenticate', async () => {
    const response = sut.execute({
      email: 'jose@jose.com',
      password: '1234567',
    })

    expect(response).rejects.toThrow('Email or password incorrect')
  })
})
