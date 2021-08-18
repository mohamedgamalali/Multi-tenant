const {getItems,getItem} = require('../controllers/items')
 const itemsOpts= {
    schema: {  
        tags:['Get Items'],
        description:'Return All The ITems',
        response: {
          200: {
            type:'array',
            items:{
            type: 'object',
            properties: {
              name: { type: 'string' },
              id:{type:'string'},
            //   title:{type:'string'}
            }
            }
          }
        }
 },
 handler: getItems
}
const itemOpts = {
schema :{
    tags:['Get Item'],
    description:'Get a single Item',
    response: {
    200:{
        type:'array',
        items:{
            type:'object',
            properties:{
                id:{type:'integer'},
                name:{type :'string'},
                title:{type:'string'}
            }
        }
    }
    }
}, 
handler:getItem
}

function itemRoutes (fastify,options,done){
fastify.get('/items',itemsOpts)
fastify.get('/items/:id',itemOpts)
    done()
}
module.exports=(itemRoutes)