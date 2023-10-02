import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { IPetRepository } from './IPetRepository'

export class InMemoryPetRepository implements IPetRepository {
  create(data: Prisma.PetCreateInput): Promise<Prisma.PetCreateInput> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<Prisma.PetCreateInput | null> {
    throw new Error('Method not implemented.')
  }

  find(
    q: Prisma.PetFindManyArgs<DefaultArgs>,
  ): Promise<Prisma.PetCreateInput[]> {
    throw new Error('Method not implemented.')
  }
}
