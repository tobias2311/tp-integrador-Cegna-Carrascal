import { createApp } from "./src/app.js";
import { loadConfig } from "./src/config/env.js";
import { createSequelize } from "./src/database/sequelize.js";

const config = loadConfig();
const sequelize = createSequelize(config.database);
const app = createApp();

async function start() {
  try {
    await sequelize.authenticate();
    console.info("Conexión a MySQL establecida mediante Sequelize");

    const server = app.listen(config.port, () => {
      console.info(`Servidor escuchando en http://localhost:${config.port}`);
    });

    async function shutdown() {
      server.close(async (error) => {
        if (error) {
          console.error("Error al cerrar el servidor:", error);
          process.exitCode = 1;
        }

        try {
          await sequelize.close();
        } catch (closeError) {
          console.error("Error al cerrar la conexión a MySQL:", closeError);
          process.exitCode = 1;
        }
      });
    }

    process.once("SIGINT", shutdown);
    process.once("SIGTERM", shutdown);
  } catch (error) {
    console.error("No se pudo iniciar el backend o conectar con MySQL:", error);
    try {
      await sequelize.close();
    } catch (closeError) {
      console.error("Error al cerrar Sequelize:", closeError);
    }
    process.exitCode = 1;
  }
}

await start();
