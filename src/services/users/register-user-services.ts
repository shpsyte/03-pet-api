import { UserAlreadyExists as OrganizationAlreadyExists } from '@/error/user-already-exists'
import { IOrganizationRepository } from '@/repositories/IOrganizationRepository'
import { hash } from 'bcryptjs'

type RegisterOrg = {
  name: string
  email: string
  zipcode: string
  address: string
  whatsapp: string
  password: string
}

export class RegisterOrganizationService {
  constructor(private repository: IOrganizationRepository) {
    this.repository = repository
  }

  async getCurrentuser(id: string) {
    return await this.repository.findById(id)
  }

  async execute({ ...org }: RegisterOrg) {
    org.password = await hash(org.password, 6)

    // check if user already exists
    const userAlreadyExists = await this.repository.checkIfOrgExists(org.email)

    if (userAlreadyExists) {
      throw new OrganizationAlreadyExists()
    }

    return await this.repository.create({ ...org })
  }
}
