import db from '../models'
import {
  CreatePersonService, GetAllPeopleService,
  GetOnePersonService, UpdatePersonService
} from '../services/people'
import { DeleteOnePersonService } from '../services/people/delete'

const { Person } = db

export const peopleResolvers = {
  Query: {
    async getPerson (_, { id }) {
      return (await GetOnePersonService.execute({ id }))?.result?.data
    },

    async getAllPeople (_, { limit, page, sortBy, sortOrder }) {
      return (await GetAllPeopleService.execute({ limit, page, sortBy, sortOrder }))?.result?.data
    }
  },

  Mutation: {
    async createPerson (_, args) {
      return (await CreatePersonService.execute({ ...args }))?.result?.data
    },

    async updatePerson (_, { ...args }) {
      return (await UpdatePersonService.execute({ ...args }))?.result?.data
    },

    async deletePerson (_, { id }) {
      return (await DeleteOnePersonService.execute({ id }))?.result?.data
    }
  }
}
