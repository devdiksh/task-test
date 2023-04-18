import { readdirSync } from 'fs'
import path, { basename as _basename } from 'path'
import { Sequelize } from 'sequelize'
import dbconfig from '../../config/db'

const basename = _basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = dbconfig[env]
const db = {}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize)
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
