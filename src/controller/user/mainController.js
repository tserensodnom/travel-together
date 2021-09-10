const User = require('../../databases/user')
async function addUser (body) {
  try {
    let user = await User.findOne({ phone: body.phone })
    if (user === null) {
      const user = await User.create(body)
      const userKey = user.getJwt()
      return userKey
    } else {
      throw new Error(`${body.phone} дугаартай хэрэглэгч бүртгэлтэй байна.`)
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = { addUser }
