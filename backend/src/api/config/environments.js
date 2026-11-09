// En este archivo haremos toda la logica para leer la info sensible del .env (variables de entorno) y exportarlas a otros modulos
import dotenv from "dotenv";

// Cargo las variables de entorno en Node.js (ya puedo acceder a ellas)
dotenv.config();

// Exporto estos valores a los modulos donde los necesite
export default {
    port: process.env.PORT || 3000,
    database: {
        host: process.env.DB_HOST || "localhost",
        name: process.env.DB_NAME || "autoservicio_deportivo",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || ""
    }
};

