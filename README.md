# Sistema de autoservicio para artículos deportivos

Plan de trabajo para el TP Integrador de Programación III (UTN), desarrollado por **Tobias Cegna** y **Augusto Carrascal**.

## Idea del sistema

Una tienda de autoservicio de artículos deportivos. El cliente podrá consultar un catálogo dividido en **indumentaria** y **equipamiento**, armar una compra y obtener un ticket. El personal administrador gestionará el catálogo y consultará ventas, encuestas y métricas.

El rubro no es alimenticio, de acuerdo con la restricción del TP. Los nombres de marca, productos de ejemplo y credenciales de prueba quedan por definir; no deben incluirse contraseñas reales en el repositorio.

## Documentos

- [Roadmap general](roadmap.md): etapas, dependencias, requisitos y criterios de aceptación.
- [Tareas de Tobias](roadmap_tobias.md): asignaciones individuales.
- [Tareas de Augusto](roadmap_augusto.md): asignaciones individuales.

## Organización prevista del sistema

- `backend/`: servidor Node.js/Express, API JSON y acceso SQL directo con `mysql2/promise`; las pantallas administrativas se planifican como HTML/CSS/JavaScript nativos, salvo indicación del docente.
- `frontend/`: interfaz del cliente para autoservicio, catálogo, compra, ticket, encuesta y detalle de producto.

La base técnica prevista sigue el material consultado de la cátedra: Node.js con módulos ES, Express, MySQL, `mysql2/promise`, `dotenv` y frontend nativo. No se presupone el uso de ORM, EJS ni librerías para PDF, Excel o subida de archivos; esos puntos se deben confirmar con el docente porque el TP puede exigirlos aunque no aparezcan en los ejemplos revisados.

## Cómo usar estos documentos

1. Confirmen la marca, el alcance final, las dos categorías y las tecnologías en equipo.
2. Sigan las etapas del roadmap general y marquen cada tarea terminada solo cuando cumpla su criterio de aceptación.
3. Cada integrante trabaja sobre su roadmap y coordina las tareas compartidas antes de integrar.
4. Registren en GitHub Issues las tareas que necesiten discusión o seguimiento y usen pull requests para integrar cambios.
