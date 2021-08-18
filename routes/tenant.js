const { index, store, destroy } = require('../controllers/tenant')
const { storeRequest } = require('../middlewares/tenant')




const opts = {
    schema: {
      
    },
    handler: store
  }
  const getOpts = {
    schema: {
      
    },
    handler: index
  }
  
function itemRoutes2(fastify,options,done){
    // fastify.route('/tenants').get(index).post(storeRequest, store)
    // fastify.route('/tenants/:uuid').delete(destroy)
    fastify.get('/tenants',getOpts)        
    fastify.post('/tenants',opts)
        fastify.get('/example', (request, reply) => {
            reply.send('hey')
        })
        
   
        done()
    }
    module.exports=(itemRoutes2)