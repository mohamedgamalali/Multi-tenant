const fastify = require ('fastify') ({logger:true})
const knex = require('knex')

const config = {
  client: 'pg',
  connection: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'tenants_app',
    password: process.env.DB_PASSWORD
  },
  pool: { min: 2, max: 10 }
}



const db = knex(config)
module.exports = { db, config }

