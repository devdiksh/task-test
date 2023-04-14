const fastify = require("fastify")({ logger: false });
const cors = require("@fastify/cors");
const pagination = require("fastify-pagination");
const swagger = require("@fastify/swagger");
const config = require("./config/app")

const { sequelize } = require("./models/index");
const PORT = config.get('port')

fastify.register(cors, { origin: "*" });
fastify.register(pagination);

fastify.register(swagger, {
  exposeRoute: true,
  routePrefix: "/documentation",
  swagger: {
    info: { title: "Person API" },
  },
});

fastify.register(require("./routes/persons"), {
  prefix: 'api/v1/person'
});

const start = async () => {
  try {
    await sequelize.sync({ force: config.get('sequelize.sync') });
    await fastify.listen({
      port: PORT
    })
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
