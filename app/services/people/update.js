import ServiceBase from '../../../common/serviceBase'
import db from '../../models'
import { ERRORS } from '../../../utils/errors'
import { MESSAGES } from '../../../utils/messages'

const constraints = {
  id: {
    presence: { allowEmpty: false }
  },
  name: {
    presence: { allowEmpty: false }
  },
  surname: {
    presence: { allowEmpty: false }
  },
  age: {
    presence: { allowEmpty: false }
  },
  gender: {
    presence: { allowEmpty: false },
    inclusion: {
      within: ['male', 'female'],
      message: '%{value} is not valid.'
    }
  },
  birthday: {
    presence: { allowEmpty: false }
  },
  phone: {
    presence: { allowEmpty: false }
  },
  email: {
    presence: { allowEmpty: false }
  },
  contacts: {
    presence: false
  }
}

export class UpdatePersonService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { id, name, surname, age, gender, birthday, phone, email, contacts } = this.filteredArgs

    try {
      const { Person } = db

      const person = await Person.findByPk(id)

      // Check if person exist
      if (!person) {
        return this.addError(ERRORS.BAD_DATA, {
          code: ERRORS.BAD_DATA,
          message: MESSAGES.PERSON_ID_INVALID
        })
      }

      // Update person
      await person.update({
        name, surname, age, gender, birthday, phone, email, contacts
      }, {
        include: [Person.associations.contacts]
      })

      return {
        data: person,
        message: MESSAGES.PERSON_UPDATED
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
