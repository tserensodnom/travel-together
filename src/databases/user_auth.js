const mongoose = require('mongoose')
const user = require('./user')
const UserAuthSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.ObjectId, ref: user },
  access_token: { type: String },
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now }
})
module.exports = mongoose.model('user_auth', UserAuthSchema)
