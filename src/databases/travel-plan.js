const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const TravelPlanSchema = new mongoose.Schema({
  image: { type: String },
  emoji: { type: String },
  status: { type: String },
  description: { type: String },
  travelers_id: { type: Array },
  requist_id: { type: Array },
  from_location_id: { type: String },
  destination_location_id: { type: String },
  organizer_id: { type: mongoose.Schema.Types.ObjectId },
  budget_id: { type: String },
  todo_list: [{ id: { type: String }, text: { type: String }, isDone: { type: Boolean } }],
  started_at: { type: Date, default: Date.now },
  duration_time: { type: Number },
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now }
})
TravelPlanSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('travel-plan', TravelPlanSchema)
