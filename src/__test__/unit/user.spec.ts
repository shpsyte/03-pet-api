import { InMemoryUserRepository } from '@/repositories/in-memory-user-repository'
import { RegisterOrganizationService } from '@/services/users/register-user-services'
import { describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'

describe('Register user Case ', () => {
  it('should be has user pwd', async () => {
    const repo = new InMemoryUserRepository()
    const userServices = new RegisterOrganizationService(repo)

    const user = await userServices.execute({
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
