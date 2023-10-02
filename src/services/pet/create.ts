import { AuthError } from '@/error/autheticate-error'
import { IOrganizationRepository } from '@/repositories/IOrganizationRepository'
import { IPetRepository } from '@/repositories/IPetRepository'
import {
  AgeEnum,
  EnergyEnum,
  EnvironmentEnum,
  IndependeceEnum,
} from '@prisma/client'
import { compare } from 'bcryptjs'

type PetRequest = {
  name: string
  about: string
  age: AgeEnum
  energy: EnergyEnum
  indepence: IndependeceEnum
  environment: EnvironmentEnum
  org_id: string
}

type PetResponse = {
  pet: {
    name: string
  }
}

export class PetCreateService {
  constructor(private repository: IPetRepository) {
    this.repository = repository
  }

  async execute({ ...data }: PetRequest): Promise<PetResponse> {
    const pet = await this.repository.create({
      about: data.about,
      age: data.age,
      energy: data.energy,
      environment: data.environment,
      indepence: data.indepence,
      name: data.name,
      org: {
        connect: {
          id: data.org_id,
        },
      },
    })

    return { pet }
  }
}
