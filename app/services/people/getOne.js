import ServiceBase from '../../../common/serviceBase'
import db from '../../models'
import { ERRORS } from '../../../utils/errors'
import { MESSAGES } from '../../../utils/messages'

const constraints = {
  id: {
    presence: { allowEmpty: false }
  }
}

export class GetOnePersonService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { id } = this.filteredArgs

    try {
      const { Person } = db

      const person = await Person.findOne({
        where: { id },
        include: [Person.associations.contacts]
      })

      // Check if person exist
      if (!person) {
        return this.addError(ERRORS.BAD_DATA, {
          code: ERRORS.BAD_DATA,
          message: MESSAGES.PERSON_ID_INVALID
        })
      }

      const contacts = await person.getContacts()
      console.log('CONTACT', contacts)

      return {
        data: person,
        message: MESSAGES.PERSON_FETCHED
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
