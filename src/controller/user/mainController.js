const User = require('../../databases/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { sendMailToUserMail } = require('../../helper/mail')
function getResetCode () { return 1000 + Math.floor(Math.random() * 8999) }
async function isLoggin (req, res, next) {
  try {
    if (!req.headers.authorization) {
      res.send({ status: 'unsuccess', message: 'Энэ үйлдлийн хийхийн та эхлээд нэвтэрсэн байх шаарплагатай' })
    }
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      res.send({ status: 'unsuccess', message: 'Тоken байхгүй байна.' })
    }
    const resultToken = await jwt.verify(token, process.env.JWT_TOKEN)
    req.user = await User.findById(resultToken.id)
    next()
  } catch (err) {
    res.send({ status: 'unsuccess', message: err.message })
  }
}
async function addUser (body) {
  try {
    const user = await User.findOne({ phone: body.phone })
    if (user === null) {
      const user = await User.create(body)
      const userKey = user.getJwt()
      delete user._id
      delete user.updated_at
      delete user.password
      delete user.created_at
      delete user.__v
      return { user, userKey }
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
      return { user: user, userKey: user.getJwt() }
    } else {
      throw new Error(`${body.name} нэртэй хэрэглэгч бүртгэлгүй байна.`)
    }
  } catch (err) {
    throw new Error(`Алдаа ${err.message}`)
  }
}
async function forgetPassword (body) {
  try {
    let user = await User.findOne({ email: body.email })
    if (user !== null) {
      const resetCode = getResetCode()
      user = JSON.parse(JSON.stringify(user))
      const confirmCode = await sendMailToUserMail(user.email, resetCode)
      if (!confirmCode) { throw new Error('unsuccess') }
      user.reset_code = resetCode
      await User.updateOne({ _id: user._id }, user)
      return { status: 'success' }
    } else {
      throw new Error(`${body.email} -тэй хэрэглэгч бүртгэлгүй байна.`)
    }
  } catch (err) {
    throw new Error(`Алдаа ${err.message}`)
  }
}
async function verifyResetcode (body) {
  try {
    let user = await User.findOne({ email: body.email })
    if (user !== null) {
      user = JSON.parse(JSON.stringify(user))
      if (user.reset_code === body.reset_code) {
        return { status: 'success' }
      } else {
        throw new Error('Verification code does not match')
      }
    } else {
      throw new Error(`${body.email} -тэй хэрэглэгч бүртгэлгүй байна.`)
    }
  } catch (err) {
    throw new Error(`Алдаа ${err.message}`)
  }
}
async function newPassword (body) {
  try {
    let user = await User.findOne({ email: body.email })
    if (user !== null) {
      user = JSON.parse(JSON.stringify(user))
      if (body.new_password === body.confirm_password) {
        const salt = await bcrypt.genSalt(10)
        body.new_password = await bcrypt.hash(body.new_password, salt)
        user.password = body.new_password ? body.new_password : user.password
        user.reset_code = null
        await User.updateOne({ _id: user._id }, user)
        return 'success'
      } else {
        throw new Error('Password does not match')
      }
    } else {
      throw new Error(`${body.email} -тэй хэрэглэгч бүртгэлгүй байна.`)
    }
  } catch (err) {
    throw new Error(`Алдаа ${err.message}`)
  }
}
async function getUser (userId) {
  try {
    const user = await User.findById(userId)
    if (user) { return user } else { throw new Error(`${userId} id тай хэрэглэгч байхгүй байна.`) }
  } catch (err) {
    return err.message
  }
}
async function setUserProfile (user, body) {
  try {
    const userRes = await User.findOne({ _id: user._id })
    if (!userRes) { throw new Error('Хэрэглэгч олдсонгүй') }
    userRes.profilePic = body.profilePic
    const response = await User.updateOne({ _id: user._id }, userRes)
    return response
  } catch (err) {
    return err.message
  }
}
module.exports = { addUser, login, isLoggin, forgetPassword, getUser, setUserProfile, verifyResetcode, newPassword }
