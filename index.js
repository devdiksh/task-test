import Fastify from 'fastify'
import mercurius from 'mercurius'
import cors from '@fastify/cors'
import pagination from 'fastify-pagination'
import swagger from '@fastify/swagger'
import config from './config/app'
import db from './app/models/index'

import { peopleSchema } from './app/graphql/schema.people'
import { peopleResolvers } from './app/graphql/resolver.people'
import { Routes } from './app/routes'

const fastify = Fastify({ logger: false })
const PORT = config.get('port')

fastify.register(cors, { origin: '*' })
fastify.register(pagination)

// Register Swagger
fastify.register(swagger, {
  exposeRoute: true,
  routePrefix: '/documentation',
  swagger: {
    info: { title: 'Person API' }
  }
})

// Register Routes REST API endpoints
fastify.register(Routes, { prefix: 'api/v1' })

// Register GraphQL with fastify with mercurius
fastify.register(mercurius, {
  schema: peopleSchema,
  resolvers: peopleResolvers,
  graphiql: true
})

const start = async () => {
  try {
    await db.sequelize.sync({ force: config.get('sequelize.sync') })
    await fastify.listen({
      port: PORT
    })
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    console.log('Fastify Error', err)
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
