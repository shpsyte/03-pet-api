import { UserAlreadyExists as OrganizationAlreadyExists } from '@/error/user-already-exists'
import { IOrganizationRepository } from '@/repositories/IOrganizationRepository'
import { hash } from 'bcryptjs'

type RegisterOrg = {
  name: string
  email: string
  zipcode: string
  address: string
  whatsapp: string
  password_hash: string
}

export class RegisterOrganizationService {
  constructor(private repository: IOrganizationRepository) {
    this.repository = repository
  }

  async execute({ ...org }: RegisterOrg) {
    org.password_hash = await hash(org.password_hash, 6)

    // check if user already exists
    const userAlreadyExists = await this.repository.checkIfOrgExists(org.email)

    if (userAlreadyExists) {
      throw new OrganizationAlreadyExists(
        `This email ${org.email} already exists`,
      )
    }

    return await this.repository.create({ ...org })
  }
}
