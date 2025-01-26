const deleteFile = require('../../utils/deleteFile')
const Product = require('../models/products')
const Project = require('../models/projects')

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('createdBy', 'name email')
      .populate('project', 'name')
    return res.json(products)
  } catch (error) {
    console.error('Error getting products:', error)
    res
      .status(500)
      .json({ message: 'Error getting products', error: error.toString() })
  }
}

const postProduct = async (req, res) => {
  try {
    const { name, productType, project } = req.body
    let img = null

    const newProduct = new Product({
      name,
      productType,
      project,
      img
    })

    if (req.file) {
      console.log(req.file)
      newProduct.img = req.file.path
    }
    console.log('Request body:', req.body)
    console.log('Request file:', req.file)

    if (req.user.role === 'admin') {
      newProduct.verified = true
    } else {
      newProduct.verified = false
    }

    const createdProduct = await newProduct.save()

    // Añadir el producto al array de productos del proyecto
    const projectToUpdate = await Project.findById(project)
    if (projectToUpdate) {
      projectToUpdate.products.push(createdProduct._id)
      await projectToUpdate.save()
    }

    res.status(201).json(createdProduct)
  } catch (error) {
    console.error('Error creating product:', error)
    res
      .status(500)
      .json({ message: 'Error creating product', error: error.toString() })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    // Verifica si se subió una nueva imagen
    if (req.file) {
      const product = await Product.findById(id)
      if (!product) return res.status(404).json({ error: 'Product not found' })

      // Elimina la imagen anterior de Cloudinary si existe
      if (product.img) {
        const publicId = product.img.split('/').pop().split('.')[0]
        await cloudinary.uploader.destroy(publicId)
      }

      // Sube la nueva imagen a Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'products'
      })
      updates.img = result.secure_url
    }

    // Actualiza el producto
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true
    })
    res.status(200).json(updatedProduct)
  } catch (error) {
    console.error('Error en updateProduct:', error.message)
    res.status(500).json({ error: error.message })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params

    const productDeleted = await Product.findByIdAndDelete(id)
    deleteFile(productDeleted.img)
    res.json({ message: 'Product removed' })
    if (!productDeleted) {
      return res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    console.error('Error deleting product:', error)
    res
      .status(500)
      .json({ message: 'Error deleting product', error: error.toString() })
  }
}

const getProductsByProject = async (req, res) => {
  try {
    const { projectId } = req.params

    const products = await Product.find({ project: projectId }).populate(
      'createdBy',
      'name email'
    )
    res.json(products)
  } catch (error) {
    console.error('Error getting products by project:', error)
    res.status(500).json({
      message: 'Error getting products by project',
      error: error.toString()
    })
  }
}

module.exports = {
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
  getProductsByProject
}
