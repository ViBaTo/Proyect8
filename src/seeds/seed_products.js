const mongoose = require('mongoose')
const Product = require('../api/models/products')

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const products = [
  {
    name: 'Product 1',
    productType: 'Type A',
    project: '60f5a3a8b6e15c001c8b1d19',
    createdBy: '60f5a3a8b6e15c001c8b1d1a',

    verified: true
  },
  {
    name: 'Product 2',
    productType: 'Type B',
    project: '60f5a3a8b6e15c001c8b1d19',
    createdBy: '60f5a3a8b6e15c001c8b1d1a',

    verified: false
  }
]

Product.insertMany(products)
  .then(() => {
    console.log('Seed data inserted successfully')
    mongoose.connection.close()
  })
  .catch((error) => {
    console.error('Error inserting seed data:', error)
    mongoose.connection.close()
  })
