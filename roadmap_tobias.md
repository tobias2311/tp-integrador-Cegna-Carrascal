# Tareas individuales — Tobias

**Foco principal:** base del backend, persistencia y operaciones de catálogo; flujo de carrito y compra en el cliente.

Las tareas dependen del roadmap general. Coordinar contratos y entregas con Augusto antes de integrar. Marcar una tarea como terminada cuando se pueda reproducir y revisar.

## Etapa 1 — Base de proyecto y datos

- [ ] Acordar con Augusto estructura, scripts, versiones y convenciones antes de inicializar.
- [x] Crear la estructura backend/frontend/documentación y la configuración inicial del servidor.
- [x] Preparar `.gitignore` y variables de entorno de ejemplo sin secretos reales.
- [x] Configurar conexión MySQL con `mysql2/promise`, pool de conexiones y variables de entorno vía `dotenv`.
- [ ] Definir tablas, relaciones y esquema SQL para productos, ventas, usuarios, detalle de venta y encuestas.
- [x] Usar consultas parametrizadas con `?` para valores recibidos; evitar concatenar entradas en SQL.
- [x] Crear datos de prueba para las categorías de indumentaria y equipamiento (tabla `products` en MySQL y `database.sql`).
- [x] Documentar cómo levantar la base vacía y cargar los datos de demostración (`database.sql` y `README.md`).

## Etapa 2 — Acceso y catálogo administrativo

- [ ] Implementar almacenamiento y verificación de contraseña con hash y usuario administrador único.
- [ ] Construir login administrativo y protección por sesión.
- [ ] Agregar acceso rápido para las credenciales de demostración requeridas por la cátedra; mantenerlas separadas de credenciales reales.
- [ ] Construir dashboard de productos en HTML/CSS/JavaScript nativo con categoría y estado.
- [ ] Implementar alta y edición de productos con las herramientas de carga de imágenes aprobadas por el docente.
- [x] Implementar baja lógica (`active = 0`) y reactivación con confirmación visual desde la API (`DELETE` y `PUT`).
- [x] Verificar que cambiar el estado no borre registros de productos ni de ventas (baja lógica, no DELETE físico).

## Etapa 3 — Catálogo y compra del cliente

- [x] Construir la presentación del catálogo con filtros por categoría, conectado a `GET /api/productos` con datos de respaldo.
- [ ] Implementar la lógica del carrito: agregar productos, cambiar cantidades y eliminar.
- [ ] Construir el modal de confirmación de compra.
- [ ] Conectar la confirmación con `POST /api/ventas` y mostrar errores de API sin simular una compra exitosa.
- [ ] Construir el ticket con cliente, fecha, nombre comercial, productos, cantidades, precio unitario y total.
- [ ] Implementar descarga del ticket PDF con la herramienta aprobada por el docente.
- [ ] Limpiar carrito y datos del cliente al salir y pasar al paso de encuesta definido con Augusto.

## Etapa 4 — Integración y calidad

- [ ] Integrar las consultas SQL/mysql2 con la API de Augusto y revisar conjuntamente el cálculo del total.
- [ ] Probar edición de producto, subida/reemplazo de imagen y estados activo/inactivo.
- [ ] Probar compra con distintas cantidades, carrito vacío, producto inválido y error del servidor.
- [ ] Revisar navegación visible y diseño adaptable con Augusto.
- [ ] Revisar tus Issues, resolver observaciones de pull request y actualizar instrucciones/documentación del área asignada.

## Entregables a compartir

- Esquema y relaciones listos para que Augusto desarrolle la API.
- Contrato de persistencia explicado y probado con registros de ejemplo.
- Flujos de productos y compra disponibles para pruebas integrales.
