const express = require('express')
const router = express.Router()
const Validator = require('validatorjs')
const { addUser, login, forgetPassword } = require('../controller/user/mainController')
router.post('/onSignup', async (req, res) => {
  try {
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
  } catch (error) {
    return res.send({ status: 'error', message: error.message })
  }
})
router.post('/onLogin', async (req, res) => {
  try {
    const body = (req.body)
    const userRule = {
      name: 'required|string',
      password: 'required|string'

    }
    const validation = new Validator(body, userRule)
    if (validation.passes()) {
      const response = await login(body)
      return res.send({ status: 'success', message: 'Амжилттай нэвтэрлээ', data: response })
    } else {
      return res.send({ status: 'error', message: validation.errors.errors })
    }
  } catch (error) {
    return res.send({ status: 'error', message: error.message })
  }
})
router.post('/forgetPassword', async (req, res) => {
  try {
    const body = (req.body)
    const userRule = {
      name: 'email|string'
    }
    const validation = new Validator(body, userRule)
    if (validation.passes()) {
      const response = await forgetPassword(body)
      if(response.status === 'success'){
        return res.send({ status: 'success', message: 'Амжилттай нэвтэрлээ'})
      }else {
        return res.send({ status: 'success', message: response.error})
      }
    } else {
      return res.send({ status: 'error', message: validation.errors.errors })
    }
  } catch (err) {
    return res.send({ status: 'error', message: err.message })
  }
})
module.exports = router
