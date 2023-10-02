import { PrismaPetRepository } from '@/repositories/prisma-pet-repository'
import { PetCreateService } from '../pet/create'

export const makePetRegisterService = () => {
  const repo = new PrismaPetRepository()
  const service = new PetCreateService(repo)

  return service
}
