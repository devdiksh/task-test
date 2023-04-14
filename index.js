const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");
const pagination = require("fastify-pagination");
const config = require("./config/app")

const { sequelize } = require("./models/index");
const PORT = config.get('port')

fastify.register(cors, { origin: "*" });
fastify.register(pagination);

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
