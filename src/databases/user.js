const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
   first_name: { type: String },
   last_name: { type: String},
   e_mail: { type: String },
   phone: { type: Number},
   created_at : { type: Date, default: Date.now }
 })
 module.exports = mongoose.model('user', UserSchema)