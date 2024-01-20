const { Router } = require('express')
const salesManagersRouter = require('./salesManagersRouter.js');

const appRouter = Router()

appRouter.use('/salesManagers', salesManagersRouter)

module.exports = appRouter