const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: false
      }
    ],
    img: { type: String, trim: true, required: false }
  },
  {
    timestamps: true,
    collection: 'projects'
  }
)

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
