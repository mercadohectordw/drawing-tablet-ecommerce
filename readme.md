# Drawing Tablets

Ecommerce de venta de tabletas digitalizadoras. Los usuarios pueden asignar productos a su carrito y comprarlo, además de actualizar su perfil. El sitio tambien incluye una página de administrador en la que se puede hacer gestión de productos, ordenes de compra y usuarios. 

![image description](https://mercadohectordw.github.io/portfolio/assets/proyectos/Drawing%20Tablets.png)

## Demo

[Drawing Tablets - DEMO](https://mercadohectordw.github.io/drawing-tablet-ecommerce/home)

## Correr Localmente

*Antes añade el archivo .env como se explica en la sección de variables de entorno.

Clona el proyecto

```bash
  git clone https://github.com/mercadohectordw/drawing-tablet-ecommerce.git my-proyect
  cd my-project
```

Ve a los dos directorios (backend y frontend) e instala sus dependencias 

```bash
  cd backend
  npm install
  cd ..
  cd frontend
  npm install
```

Para levantar los proyectos hay que ingresar a ambas carpetas y ejecutar los siguientes comandos:

/backend
```bash
  npm run start
```

/frontend
```bash
  ng serve
```

El proyecto estará en `http://localhost:4200/`
## Variables de Entorno

Para correr este proyecto, primero hay que crear un archivo .env en la carpeta "backend" e ingresarle las siguientes variables:

```
PORT=3000

DB_PORT = 3306
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = 'tu contraseña'
DB_NAME = 'drawing_tablet_ecommerce'

JWT_KEY = 'string para la creación de tokens'
```
## Autor

Mercado Hector

Github: [@mercadohectordw](https://www.github.com/mercadohectordw)

