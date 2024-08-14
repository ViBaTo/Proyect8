require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const mainRouter = require('./src/api/routes/main')
const cloudinary = require('cloudinary').v2
/* const cors = require('cors') */

const app = express()
const PORT = process.env.PORT

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

connectDB()
app.use(express.json())
/* app.arguments(cors()) */

app.use('/api/v1', mainRouter)

app.use('/ping', (req, res) => {
  res.status(200).json('pong')
})

app.use('*', (req, res) => {
  res.status(404).json('Route not found')
})

app.listen(PORT, () => {
  console.log(`Servidor desplegado en http://localhost:${PORT}`)
})
