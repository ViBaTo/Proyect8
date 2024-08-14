const User = require('../api/models/users')
const { verifyJwt } = require('../config/jwt')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    console.log('Token:', token)

    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const parsedToken = token.replace('Bearer ', '')
    console.log('Parsed Token:', parsedToken)

    const { id } = verifyJwt(parsedToken)
    console.log('User ID:', id)

    const user = await User.findById(id)
    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    user.password = null
    req.user = user

    next()
  } catch (error) {
    console.error('Error during authentication:', error)
    return res.status(401).json({ message: 'Invalid token' })
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    const parsedToken = token.replace('Bearer ', '')

    const { id } = verifyJwt(parsedToken)

    const user = await User.findById(id)

    if (user.role === 'gerente') {
      user.password = null
      req.user = user
    } else {
      return res.status(400).json({ message: 'Only gerente can do this' })
    }

    next()
  } catch (error) {
    return res.status(400).json({ message: 'Not authorized' })
  }
}

module.exports = { isAdmin, isAuth }
