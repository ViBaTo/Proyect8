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
    const { name, productType, project } = req.body

    // Encuentra y actualiza el producto, devolviendo el documento anterior
    const oldProduct = await Product.findByIdAndUpdate(
      id,
      { name, productType, project },
      { new: false } // Devuelve el documento anterior a la actualización
    )

    if (!oldProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }

    // Si se sube un nuevo archivo, actualiza el campo img y elimina el archivo anterior
    if (req.file) {
      deleteFile(oldProduct.img) // Elimina la imagen anterior
      oldProduct.img = req.file.path // Actualiza la imagen con la nueva
    }

    // Guarda el producto actualizado
    const updatedProduct = await oldProduct.save()

    res.json(updatedProduct)
  } catch (error) {
    console.error('Error updating product:', error)
    res
      .status(500)
      .json({ message: 'Error updating product', error: error.toString() })
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
