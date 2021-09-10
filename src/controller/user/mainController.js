const { create } = require('../../databases/user')
const User = require('../../databases/user')
const UserAuth = require('../../databases/user_auth')
async function createUserAuth (phone, userId) {
  try {
    const newUserAuth = {
      user_id: userId
    }
    const userAuth = await UserAuth.create(newUserAuth)
    console.log(userAuth)
  } catch (error) {
    console.log(error)
  }
}
async function addUser (body) {
  try {
    let user = await User.findOne({ phone: body.phone })
    if (user === null) {
      user = await User.create(body)
      const userAuth = createUserAuth(user.phone, user._id)
      return user
    } else {
      throw new Error(`${body.phone} дугаартай хэрэглэгч бүртгэлтэй байна.`)
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = { addUser }
