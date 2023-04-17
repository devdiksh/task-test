import db from '../models'

const { Person } = db

const createNewPerson = async ({ request, reply }) => {
  try {
    // Create a new person with contacts
    const person = await Person.create(request.body, {
      include: [Person.associations.contacts]
    })
    reply.send(person)
  } catch (err) {
    reply.status(500).send(err)
  }
}

const getPersonById = async ({ request, reply }) => {
  try {
    const person = await Person.findOne({
      where: { id: request.params.id },
      include: [{ association: Person.associations.contacts }]
    })

    if (!person) {
      reply.status(404).send()
    } else {
      reply.send(person)
    }
  } catch (err) {
    reply.status(500).send(err)
  }
}

const updatePersonById = async ({ request, reply }) => {
  try {
    const person = await Person.findByPk(request.params.id)

    if (!person) {
      reply.status(404).send()
    } else {
      await person.update(request.body)

      reply.send(person)
    }
  } catch (err) {
    reply.status(500).send(err)
  }
}

const deletePersonById = async ({ request, reply }) => {
  try {
    const person = await Person.findByPk(request.params.id)

    if (!person) {
      reply.status(404).send()
    } else {
      await person.destroy()

      reply.send()
    }
  } catch (err) {
    reply.status(500).send(err)
  }
}

const getAllPeople = async ({ request, reply }) => {
  try {
    const {
      limit = 10,
      page = 1,
      sortBy = 'email',
      sortOrder = 'ASC'
    } = request.query
    const offset = (page - 1) * limit

    const { rows, count } = await Person.findAndCountAll({
      limit,
      offset,
      include: [{ association: Person.associations.contacts }],
      order: [[sortBy, sortOrder]]
    })

    const totalPages = Math.ceil(count / limit)

    reply.send({ data: rows, pagination: { total: count, totalPages } })
  } catch (err) {
    reply.status(500).send(err)
  }
}

export {
  createNewPerson,
  getPersonById,
  updatePersonById,
  deletePersonById,
  getAllPeople
}
