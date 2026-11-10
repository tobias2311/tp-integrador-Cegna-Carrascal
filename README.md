# Sistema de autoservicio para artículos deportivos

Plan de trabajo para el TP Integrador de Programación III (UTN), desarrollado por **Tobias Cegna** y **Augusto Carrascal**.

## Idea del sistema

Una tienda de autoservicio de artículos deportivos. El cliente podrá consultar un catálogo dividido en **indumentaria** y **equipamiento**, armar una compra y obtener un ticket. El personal administrador gestionará el catálogo y consultará ventas, encuestas y métricas.

El rubro no es alimenticio, de acuerdo con la restricción del TP. Los nombres de marca, productos de ejemplo y credenciales de prueba quedan por definir; no deben incluirse contraseñas reales en el repositorio.

## Documentos

- [Roadmap general](roadmap.md): etapas, dependencias, requisitos y criterios de aceptación.
- [Tareas de Tobias](roadmap_tobias.md): asignaciones individuales.
- [Tareas de Augusto](roadmap_augusto.md): asignaciones individuales.

## Organización del sistema

La base técnica usa Node.js con módulos ES, Express, MySQL mediante `mysql2`, `dotenv` y frontend nativo.

```text
backend/
├── index.js                          # Inicia el servidor
├── database.sql                      # Crea la base y la tabla de productos
├── package.json                      # Dependencias y comandos npm
├── package-lock.json                 # Versiones instaladas de dependencias
├── .env.example                      # Plantilla de configuración local
└── src/
    ├── app.js                        # Configuración de Express y middleware general
    └── api/
        ├── config/
        │   └── environments.js       # Configuración leída desde .env
        ├── controllers/
        │   └── products.controller.js  # Lógica de los endpoints de productos
        ├── database/
        │   └── db.js                  # Pool de conexiones MySQL
        ├── middleware/
        │   └── product-validation.js  # Validación de productos e identificadores
        └── routes/
            └── products.routes.js     # Rutas de la API

frontend/
├── index.html                        # Página del catálogo
├── assets/                           # Imágenes de indumentaria y equipamiento
├── css/
│   ├── base.css                      # Estilos generales
│   ├── navbar.css                    # Encabezado y navegación
│   └── catalogo.css                  # Catálogo y tarjetas de productos
└── js/
    └── catalogo.js                   # Filtros, renderizado y conexión a la API
```

## Instalación y configuración local

### Requisitos previos

- Node.js y npm.
- MySQL instalado y en ejecución.

### 1. Crear la base de datos

Ejecutá el script `backend/database.sql` con MySQL Workbench o phpMyAdmin. El script crea la base `autoservicio_deportivo` y la tabla `products`.

### 2. Configurar y ejecutar el backend

Desde la raíz del repositorio, ejecutá:

```powershell
cd backend
Copy-Item .env.example .env
```

Editá el archivo `.env` (dentro de `backend/`) con los datos de tu MySQL (`DB_HOST`, `DB_NAME`, `DB_USER` y `DB_PASSWORD`). El archivo `.env` es local y no se sube a Git. Después, desde `backend/`, instalá las dependencias e iniciá el servidor:

```powershell
npm install
npm run dev
```

El servidor queda disponible en `http://localhost:3000`. Para verificar que responde, abrí `http://localhost:3000/api/health`; debería devolver `{"status":"ok"}`. La terminal también informa si pudo conectarse a MySQL.

Para iniciar el backend sin el modo de desarrollo, usá `npm start` desde `backend/`.

### 3. Abrir el frontend

Con el backend en ejecución, abrí `frontend/index.html` en el navegador. El catálogo intenta cargar los productos desde la API y muestra productos de respaldo si el backend no está disponible.

El backend define los comandos `npm run dev` y `npm start`; actualmente no hay un comando `npm test` configurado.

## Cómo usar estos documentos

1. Confirmen la marca, el alcance final, las dos categorías y las tecnologías en equipo.
2. Sigan las etapas del roadmap general y marquen cada tarea terminada solo cuando cumpla su criterio de aceptación.
3. Cada integrante trabaja sobre su roadmap y coordina las tareas compartidas antes de integrar.
4. Registren en GitHub Issues las tareas que necesiten discusión o seguimiento y usen pull requests para integrar cambios.
