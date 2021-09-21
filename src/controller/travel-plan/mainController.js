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
    const response = await TravelPlan.paginate({}, { skip: from, limit: size })
    return response
  } catch (err) {
    throw new Error(`Алдаа ${err.message}`)
  }
}
async function joinPlan (user, travelPlanId) {
  try {
    const travelPlan = await TravelPlan.findById(travelPlanId)
    if (travelPlan) {
      if (travelPlan.requist_id.indexOf(user._id) >= 0) {
        throw new Error('Ta тус аялалд өмнө нь хүсэлт явуулсан байна.')
      } else {
        travelPlan.requist_id.push(user._id)
        const updateResponse = await TravelPlan.updateOne({ _id: travelPlanId }, travelPlan)
        return updateResponse
      }
    } else {
      throw new Error(`Алдаа ${travelPlanId} travel-plan буруу байна.`)
    }
  } catch (err) {
    throw new Error(`Алдаа ${err.message}`)
  }
}
module.exports = { addTravelPlan, getTravelPlans, joinPlan }
