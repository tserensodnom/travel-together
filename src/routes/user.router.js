const express = require('express')
const router = express.Router()
const Validator = require('validatorjs')
const { addUser } = require('../controller/user/mainController')
router.post('/onSignup', async (req, res) => {
  const body = (req.body)
  const userRule = {
    name: 'required|string',
    email: 'required|string',
    phone: 'required',
    password: 'required'
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
