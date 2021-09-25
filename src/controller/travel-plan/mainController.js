const TravelPlan = require('../../databases/travel-plan')
const User = require('../../databases/user')
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
    const travelPlan = await TravelPlan.findOne({ _id: travelPlanId, organizer_id: { $ne: user._id } })
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
async function fetchJoinRequest (user, travelPlanId) {
  try {
    let travelPlan = await TravelPlan.findOne({ organizer_id: user._id, _id: travelPlanId })
    if (travelPlan !== null) {
      travelPlan = JSON.parse(JSON.stringify(travelPlan))
      const userRes = await User.find({ _id: { $in: travelPlan.requist_id } })
      return userRes
    } else {
      throw new Error(`${travelPlanId}, id тай travelPlan бүртгэлгүй байна`)
    }
  } catch (err) {
    return err.message
  }
}
async function fetchMyPlans (user) {
  try {
    const travelPlans = await TravelPlan.find({ $or: [{ organizer_id: user._id }, { travelers_id: user._id }] })
    if (travelPlans !== null) { return travelPlans } else { throw new Error('TravelPlan байхгүй байна.') }
  } catch (err) {
    return err.message
  }
}
module.exports = { addTravelPlan, getTravelPlans, joinPlan, fetchJoinRequest, fetchMyPlans }
