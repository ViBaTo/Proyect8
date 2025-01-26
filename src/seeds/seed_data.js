const mongoose = require('mongoose')
const Product = require('../api/models/products')
const User = require('../api/models/users')
const Project = require('../api/models/projects')
require('dotenv').config()

mongoose.connect(process.env.DB_URL)

const seedData = async () => {
  try {
    // Conexión a la base de datos
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB conectado para seeds')

    // Limpieza de datos existentes
    await User.deleteMany()
    await Project.deleteMany()
    await Product.deleteMany()
    console.log('Datos previos eliminados')

    // Creación de usuarios
    const users = await User.create([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
        role: 'user'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: '123456',
        role: 'admin'
      }
    ])
    console.log('Usuarios creados')

    // Creación de proyectos
    const projects = await Project.create([
      {
        name: 'Proyecto 1',
        description: 'Primer proyecto de prueba',
        createdBy: users[0]._id
      },
      {
        name: 'Proyecto 2',
        description: 'Segundo proyecto de prueba',
        createdBy: users[1]._id
      }
    ])
    console.log('Proyectos creados')

    // Creación de productos
    await Product.create([
      {
        name: 'Producto 1',
        productType: 'Tipo A',
        project: projects[0]._id,
        createdBy: users[0]._id,
        img: 'https://via.placeholder.com/150'
      },
      {
        name: 'Producto 2',
        productType: 'Tipo B',
        project: projects[1]._id,
        createdBy: users[1]._id,
        img: 'https://via.placeholder.com/150'
      }
    ])
    console.log('Productos creados')

    // Cerrar conexión
    await mongoose.connection.close()
    console.log('Conexión cerrada y datos creados exitosamente')
  } catch (error) {
    console.error('Error durante la creación de la semilla:', error)
    process.exit(1)
  }
}

seedData()
