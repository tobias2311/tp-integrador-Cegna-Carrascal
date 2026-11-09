/*===============
    Imports
===============*/
import express from "express"; // Importamos el framework Express
import environments from "./src/api/config/environments.js"; // Traigo la info de las variables de entorno
import connection from "./src/api/database/db.js"; // Importo la conexion a la BBDD
import cors from "cors"; // Importamos el middleware CORS



/*===============
    Config
===============*/
const app = express(); // Crea una instancia de aplicacion de Express con todos sus metodos
const PORT = environments.port;



/*=================
    Middlewares
=================*/
app.use(cors()); // Middleware CORS basico para permitir todas las solicitudes
app.use(express.json()); // Middleware para parsear el JSON recibido en el cuerpo de las solicitudes POST y PUT

// Middleware logger para analizar las solicitudes por la consola
app.use((req, res, next) => {
    const fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next(); // Pasa al siguiente middleware o a la respuesta
});

// Middleware (de ruta) para filtrar ids no validos
const validateId = (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "El id debe ser un numero entero positivo"
        });
    }

    req.id = id;
    next(); // Damos paso al siguiente middleware o a la response
};

// Middleware (de ruta) para validar la informacion de los formularios
const validateProduct = (req, res, next) => {
    // Categorias adaptadas al proyecto de autoservicio de articulos deportivos
    const categoriasValidas = ["indumentaria", "equipamiento"];
    const errores = [];

    const { name, image, price, category } = req.body;

    // Verificamos que mandamos todos los campos requeridos
    if (!name || !image || !price || !category) {
        errores.push("Faltan campos requeridos");
    }

    // Verificamos el campo nombre
    if (typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    // Verificamos el campo precio
    if (typeof price !== "number" || price <= 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    // Verificamos el campo category
    if (!categoriasValidas.includes(category)) {
        errores.push("Categoria invalida (debe ser 'indumentaria' o 'equipamiento')");
    }

    // Si hay algun error en la lista, directamente devolvemos un 400
    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos invalidos",
            listaErrores: errores
        });
    }

    next(); // Damos paso al siguiente middleware o a la response
};



/*===============
    Endpoints
===============*/
app.get("/", (req, res) => {
    res.send("Hola mundo desde un server de Express.js");
});

// Endpoint de salud
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});


// GET all products (o por categoria)
const getAllProducts = async (req, res) => {
    try {
        const { category } = req.query;
        let sql = "SELECT id, name, price, image, category, description, active FROM products";
        let params = [];

        // Si se pide filtrar por categoria
        if (category) {
            sql += " WHERE category = ?";
            params.push(category);
        }

        const [rows] = await connection.query(sql, params);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos"
            });
        }

        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.log("Error obteniendo productos: ", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

app.get("/api/products", getAllProducts);
app.get("/api/productos", getAllProducts); // Alias en español


// GET product by id
const getProductById = async (req, res) => {
    try {
        // Los placeholders "?" son una medida de seguridad para prevenir ataques de SQL Injection
        const sql = "SELECT id, name, price, image, category, description, active FROM products WHERE id = ?";
        const [rows] = await connection.query(sql, [req.id]);

        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontro producto con id: ${req.id}`
            });
        }

        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.log("Error obteniendo producto por id: ", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

app.get("/api/products/:id", validateId, getProductById);
app.get("/api/productos/:id", validateId, getProductById);


// POST product
const createProduct = async (req, res) => {
    try {
        const { name, image, category, price, description } = req.body;

        const sql = "INSERT INTO products (name, image, category, price, description, active) VALUES (?, ?, ?, ?, ?, 1)";
        const [result] = await connection.query(sql, [name.trim(), image, category, price, description || ""]);

        res.status(201).json({
            message: "Producto creado exitosamente",
            productId: result.insertId
        });

    } catch (error) {
        console.log("Error creando un producto: ", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

app.post("/api/products", validateProduct, createProduct);
app.post("/api/productos", validateProduct, createProduct);


// PUT product (soporta enviar id por body o por URL)
const updateProduct = async (req, res) => {
    try {
        const id = req.id || req.body.id;

        if (!id) {
            return res.status(400).json({
                message: "Debe proporcionar el id del producto a actualizar"
            });
        }

        const { name, image, price, category, active, description } = req.body;

        const sql = "UPDATE products SET name = ?, image = ?, price = ?, category = ?, active = ?, description = ? WHERE id = ?";
        const [result] = await connection.query(sql, [
            name.trim(),
            image,
            price,
            category,
            active !== undefined ? (active ? 1 : 0) : 1,
            description || "",
            id
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `No se encontro producto con id: ${id}`
            });
        }

        return res.status(200).json({
            message: "Producto actualizado correctamente"
        });

    } catch (error) {
        console.log("Error actualizando producto: ", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

app.put("/api/products", validateProduct, updateProduct);
app.put("/api/products/:id", validateId, validateProduct, updateProduct);
app.put("/api/productos", validateProduct, updateProduct);
app.put("/api/productos/:id", validateId, validateProduct, updateProduct);


// DELETE product (Baja logica: cambia active = 0)
const deleteProduct = async (req, res) => {
    try {
        // En el TP se pide baja logica (cambiar el valor de active a 0/false)
        const sql = "UPDATE products SET active = 0 WHERE id = ?";
        const [result] = await connection.query(sql, [req.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `No se encontro producto con id: ${req.id}`
            });
        }

        res.status(200).json({
            message: `Producto con id ${req.id} eliminado exitosamente`
        });

    } catch (error) {
        console.log("Error eliminando producto: ", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

app.delete("/api/products/:id", validateId, deleteProduct);
app.delete("/api/productos/:id", validateId, deleteProduct);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
