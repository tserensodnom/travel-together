const User = require('../../databases/user')
const jwt = require('jsonwebtoken')
async function isLoggin (req, res, next) {
  try {
    if (!req.headers.authorization) {
      throw new Error('Энэ үйлдлийн хийхийн та эхлээд нэвтэрсэн байх шаарплагатай')
    }
    const token = req.headers.authorization.split(' ')[1]
    if (!token) { throw new Error('Тоken байхгүй байна.') }
    const resultToken = await jwt.verify(token, process.env.JWT_TOKEN)
    req.user = await User.findById(resultToken.id)
    next()
  } catch (err) {
    throw new Error(`Алдаа ${err.message}`)
  }
}
async function addUser (body) {
  try {
    const user = await User.findOne({ phone: body.phone })
    if (user === null) {
      const user = await User.create(body)
      const userKey = user.getJwt()
      return userKey
    } else {
      throw new Error(`${body.phone} дугаартай хэрэглэгч бүртгэлтэй байна.`)
    }
  } catch (err) {
    throw new Error(`Алдаа ${err.message}`)
  }
}
async function login (body) {
  try {
    const user = await User.findOne({ name: body.name }).select('+password')
    if (user !== null) {
      const result = await user.checkPassword(body.password)
      if (!result) { throw new Error('Хэрэглэгчийн нэр эсвэл нууц үг буруу байна.') }
      return { user: user, apiKey: user.getJwt() }
    } else {
      throw new Error(`${body.name} нэртэй хэрэглэгч бүртгэлгүй байна.`)
    }
  } catch (err) {
    throw new Error(`Алдаа ${err.message}`)
  }
}
module.exports = { addUser, login, isLoggin }
