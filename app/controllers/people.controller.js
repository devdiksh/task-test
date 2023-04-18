import Responder from '../../common/responder'
import {
  CreatePersonService, GetAllPeopleService,
  GetOnePersonService, UpdatePersonService
} from '../services/people'
import { DeleteOnePersonService } from '../services/people/delete'

export default class PeopleController {
  static async getAllPeople (req, res) {
    const { body, params, query } = req

    const getAllPeopleResult = await GetAllPeopleService.execute({ ...body, ...params, ...query })
    if (getAllPeopleResult.successful) {
      Responder.success(res, getAllPeopleResult.result)
    } else {
      Responder.failed(res, getAllPeopleResult.errors)
    }
  }

  static async createPerson (req, res) {
    const { body, params, query } = req

    const createPersonResult = await CreatePersonService.execute({ ...body, ...params, ...query })
    if (createPersonResult.successful) {
      Responder.success(res, createPersonResult.result)
    } else {
      Responder.failed(res, createPersonResult.errors)
    }
  }

  static async updatePerson (req, res) {
    const { body, params, query } = req

    const updatePersonResult = await UpdatePersonService.execute({ ...body, ...params, ...query })
    if (updatePersonResult.successful) {
      Responder.success(res, updatePersonResult.result)
    } else {
      Responder.failed(res, updatePersonResult.errors)
    }
  }

  static async getPersonById (req, res) {
    const { body, params, query } = req

    const getPersonByIdResult = await GetOnePersonService.execute({ ...body, ...params, ...query })
    if (getPersonByIdResult.successful) {
      Responder.success(res, getPersonByIdResult.result)
    } else {
      Responder.failed(res, getPersonByIdResult.errors)
    }
  }

  static async deletePersonById (req, res) {
    const { body, params, query } = req

    const deletePersonByIdResult = await DeleteOnePersonService.execute({ ...body, ...params, ...query })
    if (deletePersonByIdResult.successful) {
      Responder.success(res, deletePersonByIdResult.result)
    } else {
      Responder.failed(res, deletePersonByIdResult.errors)
    }
  }
}
