const mongoose = require('mongoose')
const locationSchema = new mongoose.Schema({
  city: { type: String },
  key: { type: String }, // hailt ?
  score: { type: String },
  lat: { String: Number },
  long: { String: Number },
  created_at: { type: Date, default: Date.now }
})
module.exports = mongoose.model('location', locationSchema)
