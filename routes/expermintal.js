const { index } = require('../controllers/user')

const { connectionRequest } = require('../middlewares/connection')


function expermintal(fastify,opts,done){
        fastify.route({
            method: 'GET',
            url: '/exp',
            handler: index
          })
         
          fastify.addHook('preHandler', (request, reply, next) => {
            // some code
              connectionRequest(request.query, reply, next)
            // error occurred
          })
          done()
         
    }
    
    module.exports=(expermintal)

