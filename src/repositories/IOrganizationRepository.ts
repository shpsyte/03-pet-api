import { Prisma } from '@prisma/client'

export interface IOrganizationRepository {
  checkIfOrgExists(email: string): Promise<boolean>
  create(data: Prisma.OrgCreateInput): Promise<Prisma.OrgCreateInput>
  findByEmail(email: string): Promise<Prisma.OrgCreateInput | null>
  findById(id: string): Promise<Prisma.OrgCreateInput | null>
}
