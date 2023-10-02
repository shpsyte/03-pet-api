import { Prisma } from '@prisma/client'
import { IOrganizationRepository } from './IOrganizationRepository'

export class InMemoryUserRepository implements IOrganizationRepository {
  public users: Prisma.OrgCreateInput[] = []
  findByEmail(email: string): Promise<Prisma.OrgCreateInput | null> {
    return new Promise((resolve) => {
      const user = this.users.find((user) => user.email === email)

      resolve(user || null)
    })
  }

  checkIfOrgExists(email: string): Promise<boolean> {
    return new Promise((resolve) => {
      const user = this.users.find((user) => user.email === email)

      if (user) {
        resolve(true)
      }

      resolve(false)
    })
  }

  create(data: Prisma.OrgCreateInput): Promise<Prisma.OrgCreateInput> {
    return new Promise((resolve) => {
      const user = {
        id: crypto.randomUUID(),
        ...data,
      }

      this.users.push(user)

      resolve(user)
    })
  }
}
