import PeopleController from '../controllers/people.controller'

const PersonRouter = async (fastify, options) => {
  fastify.get('/', PeopleController.getAllPeople)
  fastify.post('/', PeopleController.createPerson)
  fastify.get('/:id', PeopleController.getPersonById)
  fastify.put('/:id', PeopleController.updatePerson)
  fastify.delete('/:id', PeopleController.deletePersonById)
}

export default PersonRouter
