import connection from "../database/db.js";

const getAllProducts = async (req, res) => {
    try {
        const { category } = req.query;
        let sql = "SELECT id, name, price, image, category, description, active FROM products";
        const params = [];

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

const getProductById = async (req, res) => {
    try {
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

const deleteProduct = async (req, res) => {
    try {
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

export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
