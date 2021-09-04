const testRouter = require('./test.router')
const mainRouters = (app) => {
    app.use('/test', testRouter)
}
module.exports = mainRouters