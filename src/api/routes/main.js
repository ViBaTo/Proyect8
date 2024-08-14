const productRoutes = require('./products')
const projectRoutes = require('./projects')
const userRoutes = require('./users')

const mainRouter = require('express').Router()

mainRouter.use('/projects', projectRoutes)
mainRouter.use('/products', productRoutes)
mainRouter.use('/users', userRoutes)
module.exports = mainRouter
