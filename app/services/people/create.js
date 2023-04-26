import ServiceBase from '../../../common/serviceBase'
import { ERRORS } from '../../../utils/errors'
import { MESSAGES } from '../../../utils/messages'

import db from '../../models'

const constraints = {
  name: {
    presence: { allowEmpty: false }
  },
  surname: {
    presence: { allowEmpty: false }
  },
  age: {
    presence: false
  },
  gender: {
    presence: false,
    inclusion: {
      within: ['male', 'female'],
      message: '%{value} is not valid.'
    }
  },
  birthday: {
    presence: false
  },
  phone: {
    presence: false
  },
  email: {
    presence: { allowEmpty: false }
  },
  contacts: {
    presence: false
  }
}

export class CreatePersonService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { name, surname, age, gender, birthday, phone, email, contacts } = this.filteredArgs

    try {
      const { Person } = db
      const emailExist = await Person.findOne({ where: { email } })

      // Check if email exist
      if (emailExist) {
        return this.addError(ERRORS.BAD_DATA, {
          code: ERRORS.BAD_DATA,
          message: 'Email Already exist'
        })
      }

      // Create new person
      const person = await Person.create({
        name, surname, age, gender, birthday, phone, email
      })

      if (contacts && contacts.length > 0) {
        // Find Valid Contact Ids
        const validContactIds = (await Person.findAll({
          where: { id: contacts },
          attributes: ['id']
        })).map(contact => contact.id)

        // Create Contacts
        await person.setContacts(validContactIds)

        // Reload Updated Person with contacts
        await person.reload({ include: [Person.associations.contacts] })
      }

      return {
        data: person,
        message: MESSAGES.PERSON_CREATED
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
