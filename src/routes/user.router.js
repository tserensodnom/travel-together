const express = require('express')
const router = express.Router()
const Validator = require('validatorjs')
const { addUser } = require('../controller/user/mainController')
router.post('/', async(req, res) => {
    const body = (req.body)
    const userRule = {
        last_name: 'required|string',
        first_name: 'required|string',
        phone: 'required'
    }
    const validation = new Validator(body, userRule)
    if (validation.passes()) {
        const response = await addUser(body)
        return res.send({ status: 'success', message: 'Амжилттай нэмэгдлээ', data: response })
    } else {
        return res.send({ status: 'error', message: validation.errors.errors })
    }
})
module.exports = router