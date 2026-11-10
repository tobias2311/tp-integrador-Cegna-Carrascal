import app from "./src/app.js";
import connection from "./src/api/database/db.js";
import environments from "./src/api/config/environments.js";

const { port } = environments;

app.listen(port, async () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    try {
        await connection.query("SELECT 1");
        console.log("Conectado exitosamente a la base de datos MySQL");
    } catch (error) {
        console.error("Aviso: No se pudo conectar a MySQL:", error.message);
    }
});

export default app;
