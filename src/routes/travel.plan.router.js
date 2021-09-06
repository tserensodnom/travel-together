const express = require('express')
const router = express.Router()
const Validator = require('validatorjs')
const { addTravelPlan } = require('../controller/travel-plan/mainController')
router.post('/', async(req, res) => {
    const body = (req.body)
    const travelPlanRule = {
        image: 'required|string',
        title: 'required|string',
        emoji: 'required|string'
    }
    const validation = new Validator(body, travelPlanRule)
    if (validation.passes()) {
        const response = await addTravelPlan(body)
        return res.send({ status: 'success', message: 'Амжилттай нэмэгдлээ', data: response })
    } else {
        return res.send({ status: 'error', message: validation.errors.errors })
    }
})
module.exports = router