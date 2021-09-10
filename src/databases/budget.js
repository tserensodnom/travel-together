const mongoose = require('mongoose')
const budgetSchema = new mongoose.Schema({
  cost: { type: Number },
  balance: { type: Number },
  currency: { type: String },

  created_at: { type: Date, default: Date.now }
})
module.exports = mongoose.model('budged', budgetSchema)
