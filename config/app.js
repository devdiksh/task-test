import convict from 'convict'
import { resolve } from 'path'
import dotenv from 'dotenv'

// Update path for dotenv file
dotenv.config({ path: resolve(__dirname, '../.env') })

const config = convict({
  app: {
    name: {
      doc: 'Test Task',
      format: String,
      default: 'Test Task'
    }
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 4000,
    env: 'PORT'
  },
  webApp: {
    baseUrl: {
      default: '',
      env: 'WEB_APP_BASE_URL'
    }
  },
  sequelize: {
    name: {
      default: '',
      env: 'DB_NAME'
    },
    user: {
      default: '',
      env: 'DB_USER'
    },
    password: {
      default: '',
      env: 'DB_PASSWORD'
    },
    host: {
      default: 'localhost',
      env: 'DB_HOST'
    },
    port: {
      default: 5433,
      env: 'DB_PORT'
    },
    sync: {
      default: false,
      env: 'DB_SYNC'
    }
  }
})

config.validate({ allowed: 'strict' })

export default config
