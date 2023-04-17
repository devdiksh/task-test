import {
  createNewPerson, deletePersonById, getAllPeople,
  getPersonById, updatePersonById
} from '../services/people'

const routes = async (fastify, options) => {
  // Get List of People
  fastify.get('/', async (request, reply) => {
    await getAllPeople({ request, reply })
  })

  // Create a Person
  fastify.post('/', async (request, reply) => {
    await createNewPerson({ request, reply })
  })

  // Get Person by id
  fastify.get('/:id', async (request, reply) => {
    await getPersonById({ request, reply })
  })

  // Update Person by id
  fastify.put('/:id', async (request, reply) => {
    await updatePersonById({ request, reply })
  })

  // Delete Person by id
  fastify.delete('/:id', async (request, reply) => {
    await deletePersonById({ request, reply })
  })
}

export default routes
