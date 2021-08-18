const fastify = require ('fastify') ({logger:true})
const PORT = 5000
const routes = require ('./routes/item')
const tenants = require ('./routes/tenant')
const users = require ('./routes/users')
const expermintal = require('./routes/expermintal')
const { bootstrap } = require('./services/connection-service')
fastify.register(require('fastify-swagger'), {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0'
      },
},

exposeRoute: true
})
fastify.register(routes)
fastify.register(tenants)
fastify.register(users)
fastify.register(expermintal)

  
const start =  async ()=>{
    try {
        await fastify.listen(PORT)
    } catch (error) {
        fastify.log(error)
        process.exit(1)
    }
}

start()