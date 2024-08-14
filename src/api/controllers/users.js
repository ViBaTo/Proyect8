const { generateSign } = require('../../config/jwt')

const bcrypt = require('bcrypt')
const User = require('../models/users')

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
    return res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ message: 'Error fetching users' })
  }
}

const updateUserRole = async (req, res) => {
  const { role } = req.body

  try {
    const user = await User.findById(req.params.id)

    if (user) {
      user.role = role
      const updatedUser = await user.save()
      res.json(updatedUser)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error })
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (user) {
      await user.remove()
      res.json({ message: 'User removed' })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error })
  }
}

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body
    const newUser = new User({
      name,
      email,
      password,
      role
    })

    const duplicatedUser = await User.findOne({ email: req.body.email })

    if (duplicatedUser) {
      return res.status(400).json({ message: 'User already registered' })
    }

    const userSaved = await newUser.save()
    const token = generateSign(userSaved._id)
    return res.status(201).json({
      message: 'User registered successfully',
      user: userSaved,
      token
    })
  } catch (error) {
    res.status(400).json({ message: 'Register not working' })
  }
}

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(400).json({ message: 'User does not exist' })
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id) // Generar el token con el ID del usuario
      return res.status(200).json({
        message: 'Login successful',
        user,
        token // Devolver el token junto con la información del usuario
      })
    } else {
      return res.status(400).json({ message: 'Password invalid' })
    }
  } catch (error) {
    res.status(400).json({ message: "Login doesn't work" })
  }
}

module.exports = { getUsers, updateUserRole, deleteUser, register, login }
