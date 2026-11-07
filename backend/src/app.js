import express from "express";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/api/health", (_request, response) => {
    response.json({ status: "ok" });
  });

  app.use("/api", (_request, response) => {
    response.status(404).json({ error: "Ruta de API no encontrada" });
  });

  app.use((error, _request, response, _next) => {
    console.error(error);
    response.status(500).json({ error: "Error interno del servidor" });
  });

  return app;
}
