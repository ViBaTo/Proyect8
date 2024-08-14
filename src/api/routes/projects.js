const express = require('express')
const {
  getProjects,
  postProject,
  updateProject,
  deleteProject
} = require('../controllers/projects')
const { getProductsByProject } = require('../controllers/products')
const { isAuth, isAdmin } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')

const projectRoutes = express.Router()

projectRoutes
  .route('/')
  .get(getProjects)
  .post([isAuth], upload.single('img'), postProject)

projectRoutes
  .route('/:id')
  .put(upload.single('img'), updateProject)
  .delete([isAuth], [isAdmin], deleteProject)

projectRoutes.route('/:projectId/products').get(getProductsByProject)

module.exports = projectRoutes
