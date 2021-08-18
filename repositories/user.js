const { getConnection } = require('../services/connection-service')

const getAll = async (req,res) => {
  const conn = await getConnection(req)
  await console.log({conneection:conn})
  // console.log({test:req.query.tenantId}) // data passing to this point
  // console.log({connection:conn})
  if (!conn) {
    return null
  }
  return await conn.select('*').from('users')
}

module.exports = { getAll }
