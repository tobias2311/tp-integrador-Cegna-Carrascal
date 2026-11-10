# Tareas individuales — Augusto Carrascal

**Foco principal:** API y validaciones, auditoría/reportes y bienvenida, encuesta y detalle del cliente.

Las tareas dependen del roadmap general. Acordar con Tobias interfaces, nombres de campos y rutas antes de conectar módulos. Marcar una tarea como terminada cuando se pueda reproducir y revisar.

## Etapa 1 — API y validaciones

- [x] Acordar con Tobias contrato de datos, respuestas JSON y errores (`{ payload }`, `{ message }`, `{ listaErrores }`).
- [x] Mantener Express, módulos ES y rutas con las herramientas vistas en la cátedra (sin patrones no vistos en clase).
- [x] Implementar endpoints Express: `GET /api/products`, `GET /api/products/:id`, `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id`.
- [x] Implementar listado de productos activos y detalle de producto por ID con validación de ID entero positivo.
- [x] Validar parámetros/IDs, campos obligatorios, tipos y valores positivos con middlewares `validateId` y `validateProduct`.
- [ ] Implementar registro de ventas: validar disponibilidad y cantidades, delegar persistencia y comprobar total calculado en servidor.
- [ ] Implementar historial de ventas con sus productos, cantidades y precios al momento de la compra.
- [x] Probar respuestas de éxito, validaciones y errores HTTP con datos de prueba (manualmente en navegador y phpMyAdmin).

## Etapa 2 — Administración, métricas y exportación

- [ ] Implementar sección de auditoría protegida para administradores; acordar previamente con el docente el mecanismo de sesión permitido.
- [ ] Registrar fecha, hora e identidad del administrador en cada inicio de sesión exitoso, coordinando el punto de integración con Tobias.
- [ ] Mostrar los registros de acceso en el panel.
- [ ] Construir Top 10 de productos más vendidos y Top 10 de ventas más caras.
- [ ] Definir e implementar dos métricas adicionales con fórmula y origen de datos explicados.
- [ ] Exportar historial de ventas a Excel (.xlsx) con una herramienta aprobada por el docente.
- [ ] Exportar respuestas de encuestas a Excel (.xlsx) con una herramienta aprobada por el docente.

## Etapa 3 — Experiencia del cliente

- [ ] Implementar pantalla de bienvenida que requiera el nombre del cliente.
- [ ] Implementar navegación y componentes de encabezado en HTML/CSS nativo con logo, nombre comercial, integrantes y navegación pertinente.
- [ ] Implementar cambio de tema claro/oscuro con preferencia guardada en `localStorage`.
- [ ] Implementar pantalla de detalle de producto accesible desde el catálogo y obtener el ID de la ruta.
- [ ] Diseñar encuesta con `textarea`, `email`, `checkbox`, `range` y `file`.
- [ ] Validar respuestas, mostrar errores claros y ofrecer opción secundaria para omitir.
- [ ] Persistir respuestas y fecha; guardar el archivo enviado en el servidor.
- [ ] Acordar con Tobias el endpoint y los campos de persistencia de la encuesta antes de conectar el formulario.
- [ ] Mostrar modal de agradecimiento luego del envío correcto.
- [ ] Conectar la salida del ticket con la encuesta y permitir volver al inicio tras cerrar el flujo.

## Etapa 4 — Integración y calidad

- [ ] Integrar los endpoints con el esquema SQL y la conexión mysql2 de Tobias sin duplicar reglas de negocio.
- [ ] Conectar la bienvenida, catálogo, detalle y encuesta con el flujo de cliente.
- [ ] Probar encuesta completa, omisión, datos inválidos y exportación.
- [ ] Probar sesiones sin autenticar y verificar que no accedan a rutas de administración.
- [ ] Revisar navegación visible y diseño adaptable con Tobias.
- [ ] Resolver observaciones de pull request y actualizar instrucciones/documentación del área asignada.

## Entregables a compartir

- API documentada y probada para que Tobias la conecte al catálogo y checkout.
- Sección de auditoría y reportes con cálculos explicables.
- Bienvenida, detalle y encuesta conectados al recorrido de autoservicio.
