const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  phone: { type: Number },
  password: { type: String, select: false },
  profile_image: { tyoe: String },
  resetPasswordToken: String,
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now }
})
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.methods.getJwt = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_EXPIRESIN })
  return token
}
UserSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
module.exports = mongoose.model('user', UserSchema)
