import { prisma } from '@/lib/primsa'

import { Prisma } from '@prisma/client'
import { IOrganizationRepository } from '@/repositories/IOrganizationRepository'

export class PrismaOrganizationRepository implements IOrganizationRepository {
  async findById(id: string): Promise<Prisma.OrgCreateInput | null> {
    const user = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string): Promise<Prisma.OrgCreateInput | null> {
    const user = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async checkIfOrgExists(email: string): Promise<boolean> {
    const user = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    if (user) {
      return true
    }

    return false
  }

  async create(data: Prisma.OrgCreateInput) {
    const user = await prisma.org.create({
      data,
    })

    return user
  }
}
