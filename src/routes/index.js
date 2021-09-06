const travelPlan = require('./travel.plan.router')
const user = require('./user.router')
const mainRouters = (app) => {
    app.use('/travelPlan', travelPlan)
    app.use('/user', user)
}
module.exports = mainRouters