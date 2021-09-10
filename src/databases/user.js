const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: Number },
  password: { type: String },
  profile_image: { tyoe: String },
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now }
})
module.exports = mongoose.model('user', UserSchema)
