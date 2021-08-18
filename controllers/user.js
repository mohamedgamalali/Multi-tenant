const { getAll } = require('../repositories/user')

const index = async (req, res) => {
   
   const users = await getAll(req)
   console.log("users", users)
  // console.log(req)
  // console.log(users)
  return res.send({ users })
 
}

module.exports = { index }
