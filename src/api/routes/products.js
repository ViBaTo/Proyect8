const express = require('express')
const {
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
  getProductsByProject
} = require('../controllers/products')
const { isAuth, isAdmin } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')

const productRoutes = express.Router()

productRoutes
  .route('/')
  .get(getProducts)
  .post([isAuth], upload.single('img'), postProduct)

productRoutes
  .route('/:id')
  .put(upload.single('img'), updateProduct)
  .delete([isAuth], [isAdmin], deleteProduct)

productRoutes.route('/project/:projectId').get(getProductsByProject)

module.exports = productRoutes
