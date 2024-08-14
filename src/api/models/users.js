const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['gerente', 'comercial'],
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
)

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  const salt = bcrypt.genSaltSync(10)
  this.password = bcrypt.hashSync(this.password, salt)
  next()
})

const User = mongoose.model('User', userSchema, 'users')

module.exports = User
