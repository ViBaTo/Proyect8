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
        ref: 'products',
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

const Project = mongoose.model('Project', projectSchema, 'projects')

module.exports = Project
