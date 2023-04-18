import PersonRouter from './person.router'

export const Routes = async function (fastify, options) {
  fastify.register(PersonRouter, { prefix: 'person' })
  // ... Other Routes
}
