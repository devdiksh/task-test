const config = require('./app')

module.exports = {
  development: {
    username: config.get('sequelize.user'),
    password: config.get('sequelize.password'),
    database: config.get('sequelize.name'),
    host: config.get('sequelize.host'),
    port: config.get('sequelize.port'),
    logging: false,
    dialect: 'postgres',
    timezone: '+1:00',
    define: {
      timestamps: false
    }
  },
}
