import { Prisma } from '@prisma/client'

export interface IOrganizationRepository {
  checkIfOrgExists(email: string): Promise<boolean>
  create(data: Prisma.OrgCreateInput): Promise<Prisma.OrgCreateInput>
}
