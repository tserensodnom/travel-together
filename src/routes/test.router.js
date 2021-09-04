const express = require('express')
const router = express.Router()
router.get('/', async(req, res) => {
    const test = 'test1' 
    res.send({status: 'success'})
})
module.exports = router