import { PrismaOrganizationRepository } from '@/repositories/prisma-user-repository'
import { RegisterOrganizationService } from '../users/register-user-services'

export const makeRegisterService = () => {
  const prismaRepository = new PrismaOrganizationRepository()
  const registerUserService = new RegisterOrganizationService(prismaRepository)

  return registerUserService
}
