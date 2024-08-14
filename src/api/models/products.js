const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    productType: {
      type: String,
      required: true
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    img: { type: String, trim: true, required: false },

    verified: { type: Boolean, required: true, default: false }
  },

  {
    timestamps: true,
    collection: 'products'
  }
)

const Product = mongoose.model('Product', productSchema, 'products')

module.exports = Product
