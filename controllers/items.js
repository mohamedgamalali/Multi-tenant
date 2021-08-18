const items = require('../items')
const getItems = (req,reply) =>{
    reply.send(items)
}
const getItem =  (req,reply)=>{
    let {id} =req.params
    reply.send([items[id]])
}
module.exports = ({
    getItems,getItem})