const cloudinary = require('cloudinary').v2

const deleteFile = async (url) => {
  try {
    const imgSplited = url.split('/')

    const folderName = imgSplited.at(-2)
    const fileName = imgSplited.at(-1).split('.')[0]

    const publicId = `${folderName}/${fileName}`

    console.log('Deleting image with public_id:', publicId)

    const result = await cloudinary.uploader.destroy(publicId)

    if (result.result === 'ok') {
      console.log('Imagen eliminada correctamente')
    } else {
      console.log('Error al eliminar la imagen:', result)
    }
  } catch (error) {
    console.error('Error eliminando la imagen de Cloudinary:', error)
  }
}

module.exports = deleteFile
