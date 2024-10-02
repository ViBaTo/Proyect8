const mongoose = require('mongoose')
const Product = require('../api/models/products')
const User = require('../api/models/users')
const Project = require('../api/models/projects')
require('dotenv').config()

mongoose.connect(process.env.DB_URL)

const seedProducts = async () => {
  try {
    const project = await Project.findOne()
    if (!project) {
      console.error('No project found, create a project first.')
      mongoose.connection.close()
      return
    }

    const user = await User.findOne()
    if (!user) {
      console.error('No user found, create a user first.')
      mongoose.connection.close()
      return
    }

    const products = [
      {
        name: 'Product 1',
        productType: 'Type A',
        project: project._id,
        createdBy: user._id,
        verified: true
      },
      {
        name: 'Product 2',
        productType: 'Type B',
        project: project._id,
        createdBy: user._id,
        verified: false
      }
    ]

    await Product.insertMany(products)
    console.log('Seed data inserted successfully')
  } catch (error) {
    console.error('Error inserting seed data:', error)
  } finally {
    mongoose.connection.close()
  }
}

seedProducts()
