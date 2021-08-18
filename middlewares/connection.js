const Joi = require('joi')
const { createNamespace } = require('continuation-local-storage')
const { getTenantConnection } = require('../services/connection-service')         


// var query = url_parts.query;

const namespace = createNamespace('tenants')

const connectionRequest = (req, res, next) => {
  const schema = Joi.object({
    tenantId: Joi.string().guid({ version: 'uuidv4' }).required()
  })
  let request = req
  // console.log({'testQuery1':request})
  const { error } = schema.validate(req.query)

  if (error) {
    return res.formatter.unprocess(error.message)
  }

  namespace.run((req) => {
    //  console.log({'testQuery2':request})
    namespace.set('connection', getTenantConnection(request.tenantId)).then(result=>{
      return next();

    })
    // next()
    // console.log(namespace.set('connection', getTenantConnection(request.tenantId)))
    // next()
  })
}

module.exports = { connectionRequest }
