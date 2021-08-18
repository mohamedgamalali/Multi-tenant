const { index } = require('../controllers/user')

const { connectionRequest } = require('../middlewares/connection')


function itemRoutes(fastify,opts,done){
    // fastify.route('/tenants').get(index).post(storeRequest, store)
    // fastify.route('/tenants/:uuid').delete(destroy)
    // fastify.get('/tenants',getOpts)        
    // fastify.post('/tenants',opts)
    //     fastify.get('/example', (request, reply) => {
    //         reply.send('hey')
    //     })
    
        // fastify.get('/users:id',(req,res)=>{
        //      index
        // })
        done()
        fastify.register(require('middie'))
        //  fastify.use(connectionRequest)
        fastify.route({
            method: 'GET',
            url: '/',
            //  onRequest: connectionRequest,
            handler: index
          })
          fastify.addHook('onRequest', function(request, reply, done) {
            // console.log('query', request.query); 
            // fastify.use(connectionRequest(request.query))
            // console.log(connectionRequest(request.query))
            done();
          })
    }
    
    module.exports=(itemRoutes)

