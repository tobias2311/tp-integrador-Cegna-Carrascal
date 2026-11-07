# Roadmap general — TP Integrador

**Sistema:** autoservicio de artículos deportivos
**Integrantes:** Tobias y Augusto Carrascal
**Estado:** planificación inicial

Este roadmap ordena el desarrollo y reúne los requisitos del TP en tareas verificables. La asignación detallada está en [roadmap_tobias.md](roadmap_tobias.md) y [roadmap_augusto.md](roadmap_augusto.md). No marcar como completado hasta probar el comportamiento correspondiente.

## Guía rápida de responsables

- **Tobias:** estructura y configuración inicial del backend, base de datos, productos del panel administrativo y flujo de catálogo/carrito/compra/ticket.
- **Augusto Carrascal:** base de las pantallas del cliente, API y validaciones, auditoría y reportes, bienvenida, detalle de producto y encuesta.
- **Ambos:** acuerdos iniciales, integración entre partes, pruebas completas y entrega. Si una tarea requiere el trabajo del otro, coordinen el contrato antes de avanzar.

## Acuerdos iniciales

- [ ] **Ambos:** confirmar marca, identidad visual, nombre comercial y categorías iniciales (**indumentaria** y **equipamiento**).
- [ ] **Ambos:** acordar la base técnica: Node.js (ESM), Express, MySQL con Sequelize ORM, `dotenv` y frontend HTML/CSS/JavaScript nativo; Sequelize usará `mysql2` como driver.
- [ ] **Ambos:** confirmar con el docente cómo resolver los requisitos no demostrados en clase: acceso/sesiones, hash de contraseñas, subida de archivos, Excel y PDF.
- [ ] **Augusto lidera, Tobias valida:** definir URL/origen de frontend y backend, formato de errores, paginación y estructura de respuestas de la API.
- [ ] **Tobias lidera, Augusto valida:** definir usuario de prueba del administrador sin publicar secretos reales.
- [ ] **Ambos:** convertir las tareas en Issues, asignar responsables y acordar ramas/pull requests.

## Etapas

### 1. Preparación y arquitectura

**Responsables:** Tobias prepara el esqueleto del backend; Augusto prepara la base de las pantallas del cliente. Las decisiones y el contrato inicial se acuerdan entre ambos.

- [ ] **Tobias:** crear estructura `backend/` y preparar su inicialización con módulos ES, npm y `node --watch`.
- [ ] **Augusto:** crear estructura `frontend/` y preparar las páginas base con HTML semántico, CSS externo y JavaScript nativo; cargar scripts externos con `defer`.
- [ ] **Tobias:** limitar dependencias iniciales del backend a las necesarias (`express`, `dotenv`, `sequelize`, `mysql2`; `cors` si frontend y API lo requieren), y configurar variables de entorno y `.gitignore`.
- [ ] **Tobias:** preparar Express para JSON y CORS según el despliegue; agregar otros middlewares solo cuando el flujo lo necesite y la cátedra lo haya explicado o aprobado.
- [ ] **Ambos:** mantener inicialmente la organización sencilla de los ejemplos (`index.js`, configuración y conexión a DB); separar módulos adicionales cuando ayude al TP y no introduzca patrones no vistos.

**Salida:** aplicación inicia localmente con configuración documentada y sin secretos versionados.

### 2. Persistencia y modelos

**Responsable principal:** Tobias. Augusto revisa junto a él los datos que la API necesita recibir y devolver.

- [ ] **Tobias:** configurar Sequelize ORM para MySQL, su pool de conexiones y credenciales leídas desde `.env` con `dotenv`.
- [ ] Definir y documentar los modelos:
  - Producto: identificador, nombre, descripción, precio, URL/ruta de imagen, categoría y estado activo.
  - Venta: identificador, nombre del cliente, fecha y total.
  - Usuario administrador: correo único y contraseña almacenada con hash.
  - Detalle de venta: relación muchos-a-muchos entre ventas y productos, cantidad y precio unitario al momento de la compra.
  - Encuesta: respuestas, fecha y referencia al archivo enviado.
- [ ] **Tobias:** definir los modelos Sequelize, relaciones, restricciones y reglas de borrado necesarias.
- [ ] **Tobias:** usar operaciones parametrizadas del ORM para valores variables; nunca concatenar datos de entrada en SQL.
- [ ] **Tobias:** seleccionar únicamente los atributos necesarios y validar identificadores/datos antes de consultar.
- [ ] **Tobias:** crear un procedimiento reproducible para inicializar el esquema y datos iniciales de demostración no sensibles.
- [ ] **Ambos:** verificar que la creación del esquema y la carga inicial funcionen desde cero, y revisar que el modelo cubra los datos necesarios para la API.

**Salida:** datos reproducibles y modelo documentado, incluidas las relaciones de las ventas.

### 3. API y reglas de negocio

**Responsable principal:** Augusto implementa los endpoints y validaciones; Tobias acompaña la integración con la base y resuelve con él cualquier ajuste de esquema.

- [ ] **Augusto:** implementar `POST /api/admin/setup` para la configuración inicial del administrador con contraseña protegida.
- [ ] **Augusto:** implementar listado paginado de productos activos en `GET /api/productos` y detalle en `GET /api/productos/:id`.
- [ ] **Augusto:** validar IDs, datos obligatorios, tipos, correo y precios positivos en las entradas `POST` y `PUT` correspondientes.
- [ ] **Augusto, con revisión de Tobias:** implementar `POST /api/ventas`, validar productos y cantidades, calcular el total en servidor y guardar venta y detalle de manera consistente.
- [ ] **Augusto:** implementar `GET /api/ventas` con carga asociada de productos, cantidades y precios históricos.
- [ ] **Augusto:** normalizar respuestas y errores HTTP/JSON; documentar ejemplos de éxito y error.
- [ ] **Tobias:** conectar desde las pantallas de catálogo y compra usando `fetch`, `response.json()`, `async`/`await` y manejo explícito de errores.
- [ ] **Ambos:** comprobar que productos inactivos no puedan comprarse ni aparecer en el catálogo público.

**Salida:** endpoints probados con datos válidos e inválidos y cálculos de venta verificados.

### 4. Panel administrativo

**Responsables:** Tobias hace el acceso y la gestión de productos; Augusto hace auditoría, estadísticas y exportaciones. Coordinen la autenticación y las consultas necesarias antes de conectar los módulos.

- [ ] **Tobias:** implementar el acceso de administrador; junto con Augusto, acordar con el docente el mecanismo permitido de sesión y hashing antes de desarrollarlo. No guardar contraseñas en texto plano ni improvisar autenticación.
- [ ] **Tobias:** incluir botón de acceso rápido para completar las credenciales de prueba requeridas por el TP, sin exponer credenciales reales.
- [ ] **Tobias:** mostrar productos por categoría y estado activo/inactivo; implementar alta, edición, desactivación lógica y reactivación con confirmación.
- [ ] **Tobias:** implementar subida real de imágenes después de confirmar con el docente la solución permitida.
- [ ] **Augusto:** implementar el registro de fecha, hora y administrador tras cada inicio de sesión exitoso, coordinando el punto de integración con Tobias.
- [ ] **Augusto:** crear la sección de auditoría que muestra los registros de inicio de sesión.
- [ ] **Augusto:** mostrar Top 10 de productos más vendidos, Top 10 de ventas de mayor importe y al menos dos métricas adicionales con definición y datos fuente claros.
- [ ] **Augusto:** incluir descarga Excel (.xlsx) del historial de ventas y de las encuestas respondidas, tras confirmar con el docente las herramientas permitidas.

**Salida:** todas las operaciones administrativas están protegidas, auditables y probadas con roles/sesiones.

### 5. Experiencia de autoservicio

**Responsables:** Augusto hace bienvenida, estructura de navegación, tema, detalle y encuesta; Tobias hace catálogo, carrito, confirmación, registro de compra desde el cliente y ticket.

- [ ] **Augusto:** crear bienvenida y exigir el nombre del cliente; preparar la navegación y el encabezado común del cliente.
- [ ] **Tobias:** mostrar el catálogo paginado de productos activos por categoría, con imagen, nombre, precio, descripción y cantidad.
- [ ] **Tobias:** permitir agregar, modificar cantidad y quitar productos del carrito; solicitar confirmación en un modal antes de enviar la compra a la API.
- [ ] **Tobias:** conectar la compra con la API y mostrar el ticket con artículos, cantidades, precios unitarios, total, nombre del cliente, fecha y nombre comercial.
- [ ] **Tobias:** permitir descargar el ticket como PDF, después de confirmar con el docente la herramienta aprobada.
- [ ] **Tobias:** al salir del ticket, limpiar datos de compra y enlazar con la encuesta implementada por Augusto.
- [ ] **Augusto:** crear una vista de detalle accesible desde el catálogo para cada producto y cargarla con su ID.
- [ ] **Augusto:** implementar cambio entre tema claro y oscuro, conservando la elección al recargar.

**Salida:** flujo de cliente completo, sin necesidad de escribir rutas manualmente para navegar.

### 6. Encuesta y cierre

**Responsable principal:** Augusto implementa la encuesta y persistencia; Tobias conecta el cierre del ticket con el inicio de la encuesta.

- [ ] **Augusto:** crear encuesta con `textarea`, `email`, `checkbox`, `range` y `file`; validar campos y mostrar errores comprensibles.
- [ ] **Augusto:** permitir omitir la encuesta con una acción visible pero secundaria.
- [ ] **Augusto:** guardar respuestas y fecha en la base de datos y el archivo enviado físicamente al servidor, usando la solución aprobada por el docente.
- [ ] **Augusto:** mostrar modal de agradecimiento al completar correctamente y conectar la exportación Excel desde administración.
- [ ] **Tobias:** conectar la salida del ticket con la encuesta y verificar el reinicio del flujo de compra.

**Salida:** encuesta persistida, validada, exportable y conectada al flujo posterior a la compra.

### 7. Integración, verificación y entrega

**Responsables:** ambos. Cada uno corrige los problemas de su área y vuelven a probar juntos los flujos completos.

- [ ] **Ambos:** integrar frontend, API y persistencia en una instalación limpia.
- [ ] **Ambos:** verificar flujos y errores: login, catálogo, detalle, compra, ticket, encuesta, administración y reportes.
- [ ] **Augusto lidera; Tobias revisa:** comprobar navegación por controles visibles y funcionamiento en escritorio, tablet y móvil.
- [ ] **Augusto lidera; Tobias revisa:** revisar encabezado común en todas las pantallas y agregar favicon representativo.
- [ ] **Ambos:** revisar seguridad básica, validar instalación/configuración/inicio siguiendo las instrucciones y preparar la demostración final.
- [ ] **Ambos:** revisar Issues, cambios integrados y pendientes antes de entregar.

## Requisitos transversales de aceptación

- **R1 — Favicon:** favicon de la marca presente en todas las pantallas.
- **R2 — Encabezado:** logo, nombre de la aplicación, integrantes y navegación pertinente en frontend y administración.
- **R3 — Navegación:** las personas pueden recorrer el sistema usando botones/enlaces visibles; el detalle de producto se abre desde una acción del catálogo.
- **R4 — Adaptabilidad:** todas las vistas principales funcionan en escritorio, tablet y móvil.
- **R5 — Rubro:** artículos deportivos, no alimentos.
- **Acceso y persistencia:** contraseñas nunca en texto plano; endpoints administrativos y panel protegidos; base inicializable con instrucciones claras.
- **Integridad de ventas:** total calculado en el servidor y detalle conserva cantidad y precio unitario de la compra.

## Orden de integración

1. Acordar el contrato de datos y las decisiones técnicas.
2. Integrar esquema/modelos antes de conectar los controladores.
3. Integrar API antes de conectar las pantallas cliente y administrativas.
4. Probar cada flujo completo con ambos integrantes antes de cerrar las tareas.
