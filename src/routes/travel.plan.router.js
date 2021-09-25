const express = require('express')
const router = express.Router()
const Validator = require('validatorjs')
const { isLoggin } = require('../controller/user/mainController')
const { addTravelPlan, getTravelPlans, joinPlan, fetchJoinRequest, fetchMyPlans } = require('../controller/travel-plan/mainController')
router.post('/createPlan', isLoggin, async (req, res) => {
  try {
    const body = (req.body)
    const travelPlanRule = {
      image: 'required|string',
      title: 'required|string',
      emoji: 'required|string'
    }
    const validation = new Validator(body, travelPlanRule)
    if (validation.passes()) {
      const response = await addTravelPlan(body, req.user)
      return res.send({ status: 'success', data: { id: response._id } })
    } else {
      return res.send({ status: 'error', message: validation.errors.errors })
    }
  } catch (error) {
    return res.send({ status: 'error', message: error.message })
  }
})
router.get('/fetchNewPlans', async (req, res) => {
  try {
    let size = 20; let from = 0
    if (req.query !== null && (Object.prototype.hasOwnProperty.call(req.query, 'size'))) {
      size = req.query.size ? req.query.size : 20
    }
    if (req.query !== null && (Object.prototype.hasOwnProperty.call(req.query, 'from'))) {
      from = req.query.from ? req.query.from : 0
    }
    const travelPlans = await getTravelPlans(size, from)
    return res.send({ status: 'success', data: travelPlans })
  } catch (error) {
    return res.send({ status: 'error', message: error.message })
  }
})
router.get('/joinPlan', isLoggin, async (req, res) => {
  try {
    let travelPlanId = ''
    if (req.query !== null && (Object.prototype.hasOwnProperty.call(req.query, 'travel_plan_id'))) {
      travelPlanId = req.query.travel_plan_id
    }
    const response = await joinPlan(req.user, travelPlanId)
    if (response.acknowledged === true) {
      return res.send({ status: 'success' })
    } else {
      return res.send({ status: 'unsuccess', message: response.error })
    }
  } catch (err) {
    return res.send({ status: 'error', message: err.message })
  }
})
router.get('/fetchJoinRequest/:travelPlanId', isLoggin, async (req, res) => {
  try {
    let travelPlanId = ''
    if (req.params !== null && (Object.prototype.hasOwnProperty.call(req.params, 'travelPlanId'))) {
      travelPlanId = req.params.travelPlanId ? req.params.travelPlanId : ''
    }
    const response = await fetchJoinRequest(req.user, travelPlanId)
    return res.send({ status: 'success', data: response })
  } catch (err) {
    return res.send({ status: 'error', message: err.message })
  }
})
router.get('/fetchMyPlans/', isLoggin, async (req, res) => {
  try {
    const response = await fetchMyPlans(req.user)
    return res.send({ status: 'success', data: response })
  } catch (err) {
    return res.send({ status: 'error', message: err.message })
  }
})
module.exports = router
