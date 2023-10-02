import { PrismaOrganizationRepository } from '@/repositories/prisma-user-repository'
import { AuthenticateService } from '../users/authenticate'

export function makeAutheTicateService() {
  const repository = new PrismaOrganizationRepository()
  const service = new AuthenticateService(repository)

  return service
}
