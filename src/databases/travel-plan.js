const mongoose = require('mongoose')
const travelPlanSchema = new mongoose.Schema({
   image: { type: String },
   emoji: { type: String},
   status: { type: String },
   from_location_id :{ type: String},
   destination_location_id : { type : String },
   user_id: { type: String },
   budget_id: { type: String },
   todo_list_id: { type: String},
   duration_time: { type: Date },
   created_at : { type: Date, default: Date.now }
 })
 module.exports = mongoose.model('travel-plan', travelPlanSchema)