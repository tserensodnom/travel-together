const express = require('express')
const router = express.Router()
const Validator = require('validatorjs')
const { isLoggin } = require('../controller/user/mainController')
const { addUser, login, forgetPassword, getUser, setUserProfile } = require('../controller/user/mainController')
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
      return res.send({ status: 'success', userKey: response.userKey, data: { user: response.user } })
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
      return res.send({ status: 'success', userKey: response.userKey, data: { user: response.user } })
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
      if (response.status === 'success') {
        return res.send({ status: 'success', message: 'Амжилттай нэвтэрлээ' })
      } else {
        return res.send({ status: 'success', message: response.error })
      }
    } else {
      return res.send({ status: 'error', message: validation.errors.errors })
    }
  } catch (err) {
    return res.send({ status: 'error', message: err.message })
  }
})
router.get('/getUser/:userId', async (req, res) => {
  try {
    let userId
    if (req.params !== null && (Object.prototype.hasOwnProperty.call(req.params, 'userId'))) {
      userId = req.params.userId
    }
    const response = await getUser(userId)
    res.send({ status: 'success', data: response })
  } catch (err) {
    res.send({ status: 'error', message: err.message })
  }
})
router.post('/setUserProfile/', isLoggin, async (req, res) => {
  try {
    const body = (req.body)
    const bodyRule = {
      profilePic: 'required|string'
    }
    const validation = new Validator(body, bodyRule)
    if (validation.passes()) {
      const response = await setUserProfile(req.user, body)
      if (response.acknowledged === true) {
        return res.send({ status: 'success' })
      } else {
        return res.send({ status: 'unsuccess', message: response.error })
      }
    } else {
      return res.send({ status: 'error', message: validation.errors.errors })
    }
  } catch (err) {
    res.send({ status: 'error', message: err.message })
  }
})
module.exports = router
