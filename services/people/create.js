import ServiceBase from '../../common/serviceBase'
import db from '../../models'
import { ERRORS } from '../../utils/errors'
import { MESSAGES } from '../../utils/messages'

const constraints = {
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
  }
}

export class CreatePersonService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { name, surname, age, gender, birthday, phone, email } = this.filteredArgs

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
      }, {
        include: [Person.associations.contacts]
      })

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
