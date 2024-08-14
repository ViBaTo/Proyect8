const deleteFile = require('../../utils/deleteFile')
const Project = require('../models/projects')

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({})
    res.json(projects)
  } catch (error) {
    res.status(500).json({ message: 'Error getting projects', error })
  }
}

const postProject = async (req, res) => {
  try {
    const newProject = new Project(req.body)
    if (req.file) {
      newProject.img = req.file.path
    }

    if (req.user.role === 'admin') {
      newProject.verified = true
    } else {
      newProject.verified = false
    }

    const createdProject = await newProject.save()
    res.status(201).json(createdProject)
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error })
  }
}

const updateProject = async (req, res) => {
  const { id } = req.params

  try {
    // Encuentra el proyecto existente
    const oldProject = await Project.findById(id)

    if (!oldProject) {
      return res.status(404).json({ message: 'Project not found' })
    }

    // Depuración: verifica que `req.file` contiene la imagen
    console.log('Uploaded file:', req.file)

    // Actualiza las propiedades del proyecto existente
    const updates = { ...req.body }

    if (req.file) {
      updates.img = req.file.path
      // Elimina la imagen antigua de Cloudinary
      await deleteFile(oldProject.img)
    }

    // Preserva la lista de productos anterior y añade nuevos productos si los hay
    updates.products = [...oldProject.products, ...(req.body.products || [])]

    // Encuentra y actualiza el proyecto
    const updatedProject = await Project.findByIdAndUpdate(id, updates, {
      new: true
    })

    res.json(updatedProject)
  } catch (error) {
    console.error('Error updating project:', error)
    res
      .status(500)
      .json({ message: 'Error updating project', error: error.toString() })
  }
}

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params
    const projectDeleted = await Project.findByIdAndDelete(id)

    if (!projectDeleted) {
      return res.status(404).json({ message: 'Project not found' })
    }

    // Asegúrate de que la propiedad `img` contiene la URL correcta
    console.log('Image URL to be deleted:', projectDeleted.img)

    if (projectDeleted.img) {
      await deleteFile(projectDeleted.img)
    }

    res.json({ message: 'Project removed' })
  } catch (error) {
    console.error('Error deleting project:', error)
    res
      .status(500)
      .json({ message: 'Error deleting project', error: error.toString() })
  }
}

module.exports = {
  getProjects,
  postProject,
  updateProject,
  deleteProject
}
