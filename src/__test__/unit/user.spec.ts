import { InMemoryUserRepository } from '@/repositories/in-memory-user-repository'
import { RegisterOrganizationService } from '@/services/users/register-user-services'
import { describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { beforeEach } from 'node:test'

describe('Register user Case ', () => {
  let repo: InMemoryUserRepository
  let sut: RegisterOrganizationService

  beforeEach(() => {
    repo = new InMemoryUserRepository()
    sut = new RegisterOrganizationService(repo)
  })

  it('should be has user pwd', async () => {
    const user = await sut.execute({
      address: 'Rua teste',
      email: 'j@j.com',
      name: 'teste',
      password: '123456',
      whatsapp: '123456',
      zipcode: '123456',
    })

    const isPedHashed = await compare('123456', user.password)

    expect(isPedHashed).toBe(true)
  })
})
