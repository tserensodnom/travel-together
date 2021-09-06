const travelPlan = require('./travel.plan.router')
const mainRouters = (app) => {
    app.use('/travelPlan', travelPlan)
}
module.exports = mainRouters