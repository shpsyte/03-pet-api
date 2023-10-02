import { IOrganizationRepository } from '@/repositories/IOrganizationRepository'
import { compare } from 'bcryptjs'

type AuthenticateRequest = {
  email: string
  password: string
}

type AuthenticateResponse = {
  user: {
    name: string
    email: string
  }
}

export class AuthenticateService {
  constructor(private repository: IOrganizationRepository) {
    this.repository = repository
  }

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.repository.findByEmail(email)

    if (!user) {
      throw new Error('Email or password incorrect')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Email or password incorrect')
    }

    return {
      user: {
        name: user.name,
        email: user.email,
      },
    }
  }
}
