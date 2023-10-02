import { Prisma } from '@prisma/client'

export interface IPetRepository {
  create(data: Prisma.PetCreateInput): Promise<Prisma.PetCreateInput>
  findById(id: string): Promise<Prisma.PetCreateInput | null>
  find(q: Prisma.PetFindManyArgs): Promise<Prisma.PetCreateInput[]>
}
