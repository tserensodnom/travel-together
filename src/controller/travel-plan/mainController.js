const travelPlan = require('../../databases/travel-plan')
async function addTravelPlan(body){
    try {
       const response = travelPlan.create(body)
       return response
    } catch (error) {
       console.log(error) 
    }
}
module.exports= { addTravelPlan }