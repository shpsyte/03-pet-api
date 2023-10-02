import { Prisma } from '@prisma/client'

export class InMemoryUserRepository {
  public users: Prisma.OrgCreateInput[] = []
  async create(data: Prisma.OrgCreateInput) {
    this.users.push(data)

    return this.users
  }
}
