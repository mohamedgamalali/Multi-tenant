const Queue = require('bull')
const { db } = require('../config/database')
const migrate = require('../migrations')
const seed = require('../seeders')
require('dotenv').config();

 const { bootstrap, getTenantConnection } =  require('../services/connection-service')

const up = async (params) => {
  
  const job = new Queue(
    `setting-up-database-${new Date().getTime()}`,
    `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
  )
  job.add({ ...params })
  job.process(async (job, done) => {
    try {
      await db.raw(`CREATE ROLE ${params.tenantName} WITH LOGIN;`) // Postgres requires a role or user for each tenant
      await db.raw(
        `GRANT ${params.tenantName} TO ${'postgres'};`
      ) // you need provide permissions to your admin role in order to allow the database administration
      await db.raw(`CREATE DATABASE ${params.tenantName};`)
      await db.raw(
        `GRANT ALL PRIVILEGES ON DATABASE ${params.tenantName} TO ${params.tenantName};`
      )
       await bootstrap() // refresh tenant connections to include the new one as available
      const tenant = getTenantConnection(params.uuid)
      await migrate(tenant) // create all tables in the current tenant database
      await seed(tenant) // fill tables with dummy data
    } catch (e) {
      console.error(e)
    }
  })
}

module.exports = { up  }