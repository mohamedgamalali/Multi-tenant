const knex = require('knex')
const { getNamespace } = require('continuation-local-storage')
const { db, config } = require('../config/database')


let tenantMapping

const getConfig = (tenant) => {
  const { db_username: user, db_name: database, db_password: password } = tenant

  return {
    ...config,
    connection: {
      ...config.connection,
      user,
      database,
      password
    }
  }
}


// const getConnection = (req) => getNamespace('tenants').get('connection') || null
const getConnection = async (req)=> {
  console.log({therewego:getNamespace('tenants').get('connection')})
  return getNamespace('tenants').get('connection')
}

const bootstrap = async () => {
  try {
    const tenants = await db
      .select('uuid', 'db_name', 'db_username', 'db_password')
      .from('tenants')

    tenantMapping = tenants.map((tenant) => ({
      uuid: tenant.uuid,
      connection: knex(getConfig(tenant))
    }))
    // const test = tenantMapping
     
  } catch (error) {
    console.error(error)
  }
}
 
const getTenantConnection = async (uuid) => {
  await bootstrap()
  const tenant = tenantMapping.find((tenant) => tenant.uuid === uuid)
  
  if (!tenant) return null

//  console.log({asdas:tenant.connection});
  return tenant.connection
}

module.exports = { bootstrap, getTenantConnection, getConnection }
