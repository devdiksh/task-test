import ServiceBase from '../../common/serviceBase'
import db from '../../models'
import { ERRORS } from '../../utils/errors'
import { MESSAGES } from '../../utils/messages'

const constraints = {
  limit: {
    presence: false
  },
  page: {
    presence: false
  },
  sortBy: {
    presence: false
  },
  sortOrder: {
    presence: false
  }
}

export class GetAllPeopleService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    let { limit, page, sortBy, sortOrder } = this.filteredArgs

    try {
      const { Person } = db

      limit = limit || 10
      page = page || 1
      sortBy = sortBy || 'email'
      sortOrder = sortOrder || 'ASC'
      const offset = (page - 1) * limit

      const { rows, count } = await Person.findAndCountAll({
        limit,
        offset,
        include: [{ association: Person.associations.contacts }],
        order: [[sortBy, sortOrder]]
      })

      const totalPages = Math.ceil(count / limit)

      return {
        data: rows,
        pagination: { total: count, totalPages },
        message: MESSAGES.PEOPLE_FETCHED
      }
    } catch (error) {
      return this.addError(ERRORS.INTERNAL, {
        code: ERRORS.INTERNAL,
        message: 'Server Error',
        detail: error
      })
    }
  }
}
