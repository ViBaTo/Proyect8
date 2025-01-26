# Proyecto 8: API REST con Express, MongoDB y Cloudinary

## **Descripción del Proyecto**

Esta aplicación API REST permite gestionar usuarios, proyectos y productos. Incluye subida de archivos a Cloudinary y relaciones entre colecciones en una base de datos MongoDB Atlas.

## **Características**

- **CRUD completo** para usuarios, proyectos y productos.
- **Relaciones** entre usuarios, proyectos y productos.
- **Gestión de archivos**: Subida y eliminación en Cloudinary.
- Implementación de **autenticación** y **autorización** para endpoints restringidos.
- Datos iniciales generados mediante una **semilla** para pruebas.

---

## **Estructura del Proyecto**

```
Proyecto8/
├── src/
│   ├── api/
│   │   ├── controllers/   # Controladores de lógica de negocio
│   │   ├── models/        # Modelos de datos (Mongoose)
│   │   ├── routes/        # Rutas de la API
│   ├── config/            # Configuración (Cloudinary, MongoDB)
│   ├── middlewares/       # Middleware para autenticación y manejo de archivos
│   ├── seeds/             # Script para datos iniciales
│   ├── utils/             # Utilidades varias
├── .env                   # Variables de entorno
├── main.js                # Entrada principal de la aplicación
├── README.md              # Documentación
```

---

## **Requisitos Previos**

1. Node.js instalado.
2. Base de datos MongoDB Atlas.
3. Cuenta en Cloudinary.

---

## **Configuración del Proyecto**

1. Clona el repositorio:
   ```bash
   git clone <https://github.com/ViBaTo/Proyect8>
   cd Proyecto8
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno en el archivo `.env`:
   ```env
   PORT=3003
   DB_URL=<URL_DE_TU_BASE_DE_DATOS>
   JWT_SECRET=<SECRET_JWT>
   CLOUD_NAME=<NOMBRE_CLOUDINARY>
   API_KEY=<API_KEY_CLOUDINARY>
   API_SECRET=<API_SECRET_CLOUDINARY>
   ```
4. Ejecuta el servidor:
   ```bash
   npm start
   ```
5. Genera datos iniciales:
   ```bash
   node src/seeds/seed_data.js
   ```

---

## **Endpoints de la API**

### **Usuarios**

| Método | Endpoint                 | Descripción                         |
| ------ | ------------------------ | ----------------------------------- |
| POST   | `/api/v1/users/register` | Registra un nuevo usuario.          |
| POST   | `/api/v1/users/login`    | Inicia sesión y devuelve un token.  |
| GET    | `/api/v1/users`          | Obtiene todos los usuarios (Admin). |
| PUT    | `/api/v1/users/:id`      | Actualiza datos de un usuario.      |
| DELETE | `/api/v1/users/:id`      | Elimina un usuario (Admin).         |

### **Proyectos**

| Método | Endpoint               | Descripción                      |
| ------ | ---------------------- | -------------------------------- |
| GET    | `/api/v1/projects`     | Obtiene todos los proyectos.     |
| POST   | `/api/v1/projects`     | Crea un nuevo proyecto.          |
| PUT    | `/api/v1/projects/:id` | Actualiza un proyecto existente. |
| DELETE | `/api/v1/projects/:id` | Elimina un proyecto existente.   |

### **Productos**

| Método | Endpoint                              | Descripción                      |
| ------ | ------------------------------------- | -------------------------------- |
| GET    | `/api/v1/products`                    | Obtiene todos los productos.     |
| POST   | `/api/v1/products`                    | Crea un nuevo producto.          |
| PUT    | `/api/v1/products/:id`                | Actualiza un producto existente. |
| DELETE | `/api/v1/products/:id`                | Elimina un producto existente.   |
| GET    | `/api/v1/products/project/:projectId` | Obtiene productos por proyecto.  |

---

## **Gestión de Archivos**

- Los archivos (imágenes) se suben a Cloudinary mediante `multer` y se guardan las URLs en la base de datos.
- Al eliminar un producto o proyecto, se elimina automáticamente su archivo asociado en Cloudinary.

---

## **Semilla de Datos**

El script de semillas (`src/seeds/seed_data.js`) genera:

1. Usuarios de prueba.
2. Proyectos asociados a los usuarios.
3. Productos asociados a los proyectos.

Ejecuta el script con:

```bash
node src/seeds/seed_data.js
```

---
