const mongoose = require('mongoose')
const locationSchema = new mongoose.Schema({
   location_id: { type: String }, //uniq_id
   name:{ type: String},
   keys: { type: String },
   lat: { String: Number },
   long: { String: Number },
   location_type: { type: String }, // from or destination
   created_at : { type: Date, default: Date.now }
 })
 module.exports = mongoose.model('location', locationSchema)