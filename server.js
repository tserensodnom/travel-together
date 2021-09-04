const express = require('express')
const mainRouters = require('./src/routes')
const app = express()
app.use(express.json({ limit: '50mb' }))
require('dotenv').config()
mainRouters(app)
app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})