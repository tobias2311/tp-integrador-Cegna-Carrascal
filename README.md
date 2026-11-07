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

- `backend/`: servidor Node.js/Express, API JSON y acceso a MySQL mediante Sequelize ORM; las pantallas administrativas se desarrollarán de acuerdo con los requisitos del TP.
- `frontend/`: interfaz del cliente. La página principal queda en la raíz; `css/` contiene estilos, `js/` la lógica del navegador y `assets/` imágenes e iconos. Actualmente hay un catálogo de prueba sin conexión a la API; las carpetas para otras pantallas o componentes se agregarán cuando hagan falta.
- `documentacion/`: documentación técnica del proyecto cuando se incorpore.

La base técnica usa Node.js con módulos ES, Express, MySQL, Sequelize ORM, `dotenv` y frontend nativo. El dialecto MySQL de Sequelize usa `mysql2` como driver. Las herramientas de PDF, Excel y subida de archivos se confirmarán con el docente antes de implementarlas.

### Backend inicial

Desde `backend/`, copiá `.env.example` como `.env` y completá en `.env` los datos de tu instalación local de MySQL. `.env.example` contiene solo nombres de variables y valores de ejemplo; se puede versionar para que cada integrante sepa qué configuración necesita. `.env` contiene tus credenciales reales, por eso está excluido de Git y no debe compartirse ni subirse. Luego ejecutá `npm install` y `npm run dev`. El servidor comprueba la conexión a MySQL con Sequelize antes de iniciar en `http://localhost:3000`; `GET /api/health` permite comprobar que responde. Las pruebas se ejecutan con `npm test`.

## Cómo usar estos documentos

1. Confirmen la marca, el alcance final, las dos categorías y las tecnologías en equipo.
2. Sigan las etapas del roadmap general y marquen cada tarea terminada solo cuando cumpla su criterio de aceptación.
3. Cada integrante trabaja sobre su roadmap y coordina las tareas compartidas antes de integrar.
4. Registren en GitHub Issues las tareas que necesiten discusión o seguimiento y usen pull requests para integrar cambios.
