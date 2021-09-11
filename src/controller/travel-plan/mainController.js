const TravelPlan = require('../../databases/travel-plan')
async function addTravelPlan (body, user) {
  try {
    const travelPlan = {
      image: body.image,
      title: body.title,
      emoji: body.emoji,
      organizer_id: user._id
    }
    const response = TravelPlan.create(travelPlan)
    return response
  } catch (err) {
    throw new Error(`Алдаа ${err.message}`)
  }
}
async function getTravelPlans (size, from) {
  try {
    const response = await TravelPlan.find({ skip: from, limit: size })
    console.log(response)
    return response
  } catch (err) {
    throw new Error(`Алдаа ${err.message}`)
  }
}
module.exports = { addTravelPlan, getTravelPlans }
