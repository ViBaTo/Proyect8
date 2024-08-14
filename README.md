Aquí tienes el README estructurado para tu proyecto, siguiendo el formato que has proporcionado:

````markdown
# Proyecto8

## Descripción

Proyecto8 es una API RESTful diseñada para gestionar proyectos y productos, ofreciendo funcionalidades de creación, lectura, actualización y eliminación (CRUD) para estas entidades. Además, la API permite la gestión de archivos mediante la integración con Cloudinary, asegurando que las imágenes asociadas a los proyectos y productos sean subidas y eliminadas correctamente. La API también implementa autenticación y autorización utilizando JSON Web Tokens (JWT), garantizando que solo los usuarios autorizados puedan realizar ciertas operaciones.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework web para Node.js, utilizado para construir la API REST.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar la información de proyectos y productos.
- **Mongoose**: Librería de modelado de datos para MongoDB, utilizada para interactuar con la base de datos de manera sencilla.
- **Cloudinary**: Servicio de gestión de archivos en la nube, utilizado para almacenar y gestionar imágenes asociadas a proyectos y productos.
- **Multer**: Middleware para manejar la subida de archivos en Node.js, integrado con Cloudinary.
- **JSON Web Tokens (JWT)**: Tecnología utilizada para la autenticación y autorización de usuarios.
- **bcrypt**: Herramienta para encriptar contraseñas y garantizar la seguridad de las credenciales de usuario.
- **dotenv**: Carga variables de entorno desde un archivo `.env` para configurar el entorno de ejecución.

## Instalación

Para ejecutar este proyecto en tu entorno local, sigue los siguientes pasos:

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/tuusuario/Proyecto8.git
   cd Proyecto8
   ```
````

2. **Instalar dependencias**

   Asegúrate de tener Node.js y npm instalados en tu sistema. Luego, ejecuta:

   ```bash
   npm install
   ```

3. **Configurar las variables de entorno**

   Crea un archivo `.env` en la raíz del proyecto y configura las siguientes variables:

   ```plaintext
   PORT=3003
   MONGODB_URI=mongodb://localhost:27017/proyecto8
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Iniciar el servidor**

   ```bash
   npm run dev
   ```

## Endpoints

### Usuarios

- **GET /api/v1/users**: Obtener todos los usuarios (Requiere `isAdmin`)
- **POST /api/v1/users/register**: Registrar un nuevo usuario
- **POST /api/v1/users/login**: Iniciar sesión y obtener un token JWT
- **PUT /api/v1/users/:id**: Actualizar el rol de un usuario (Requiere `isAdmin`)
- **DELETE /api/v1/users/:id**: Eliminar un usuario (Requiere `isAdmin`)

### Proyectos

- **GET /api/v1/projects**: Obtener todos los proyectos
- **POST /api/v1/projects**: Crear un nuevo proyecto
- **PUT /api/v1/projects/:id**: Actualizar un proyecto existente (Requiere `isAdmin`)
- **DELETE /api/v1/projects/:id**: Eliminar un proyecto (Requiere `isAdmin`)

### Productos

- **GET /api/v1/products**: Obtener todos los productos
- **POST /api/v1/products**: Crear un nuevo producto (Requiere `isAuth`)
- **PUT /api/v1/products/:id**: Actualizar un producto existente (Requiere `isAuth`)
- **DELETE /api/v1/products/:id**: Eliminar un producto (Requiere `isAuth`)
- **GET /api/v1/products/project/:projectId**: Obtener productos asociados a un proyecto específico

## Ejemplos de Uso

### Registro de un Usuario:

```bash
curl -X POST http://localhost:3003/api/v1/users/register \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123",
  "role": "comercial"
}'
```

### Iniciar Sesión:

```bash
curl -X POST http://localhost:3003/api/v1/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "johndoe@example.com",
  "password": "password123"
}'
```

Esto devolverá un token JWT que deberás usar para acceder a las rutas protegidas.

### Acceder a Productos con Autenticación:

```bash
curl -X GET http://localhost:3003/api/v1/products \
-H "Authorization: Bearer <tu_token_jwt>"
```

```

```
