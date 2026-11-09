// Importamos el modulo mysql2 en modo promesas para poder hacer peticiones asincronas a la BBDD
import mysql2 from "mysql2/promise"; // Asi podremos usar async...await

// Importamos la informacion de la conexion a la BBDD
import environments from "../config/environments.js";

// Extraemos el objeto database de environments
const { database } = environments;

// Creamos una conexion (un grupo / pool de conexiones) a la BBDD
const connection = mysql2.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

export default connection;

