import Fastify from 'fastify'
import cors from '@fastify/cors'
import pagination from 'fastify-pagination'
import swagger from '@fastify/swagger'
import config from './config/app'
import db from './models/index'
import PersonRoutes from './routes/persons'

const fastify = Fastify({ logger: true })
const PORT = config.get('port')

fastify.register(cors, { origin: '*' })
fastify.register(pagination)

fastify.register(swagger, {
  exposeRoute: true,
  routePrefix: '/documentation',
  swagger: {
    info: { title: 'Person API' }
  }
})

fastify.register(PersonRoutes, {
  prefix: 'api/v1/person'
})

const start = async () => {
  try {
    await db.sequelize.sync({ force: config.get('sequelize.sync') })
    await fastify.listen({
      port: PORT
    })
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
