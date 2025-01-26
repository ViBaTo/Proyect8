const Project = require('../models/projects')
const cloudinary = require('../../config/cloudinary')

exports.createProject = async (req, res) => {
  try {
    // Subir archivo a Cloudinary si está presente
    let fileUrl = null
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'projects'
      })
      fileUrl = result.secure_url
    }

    const project = new Project({ ...req.body, fileUrl })
    await project.save()
    res.status(201).json(project)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('createdBy')
      .populate('products')
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    // Si hay un archivo nuevo, súbelo a Cloudinary y actualiza fileUrl
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'projects'
      })
      updates.fileUrl = result.secure_url
    }

    const project = await Project.findByIdAndUpdate(id, updates, { new: true })
    if (!project) return res.status(404).json({ error: 'Project not found' })

    res.status(200).json(project)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ error: 'Project not found' })

    // Eliminar archivo de Cloudinary
    if (project.fileUrl) {
      const publicId = project.fileUrl.split('/').pop().split('.')[0]
      await cloudinary.uploader.destroy(`projects/${publicId}`)
    }

    await project.remove()
    res.status(200).json({ message: 'Project deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
