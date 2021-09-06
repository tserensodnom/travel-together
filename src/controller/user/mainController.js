const User = require('../../databases/user')
async function addUser(body){
    try {
       const response = User.create(body)
       return response
    } catch (error) {
       console.log(error) 
    }
}
module.exports= { addUser }