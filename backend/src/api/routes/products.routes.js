import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct
} from "../controllers/products.controller.js";
import { validateId, validateProduct } from "../middleware/product-validation.js";

const router = Router();

router.get("/products", getAllProducts);
router.get("/productos", getAllProducts);

router.get("/products/:id", validateId, getProductById);
router.get("/productos/:id", validateId, getProductById);

router.post("/products", validateProduct, createProduct);
router.post("/productos", validateProduct, createProduct);

router.put("/products", validateProduct, updateProduct);
router.put("/products/:id", validateId, validateProduct, updateProduct);
router.put("/productos", validateProduct, updateProduct);
router.put("/productos/:id", validateId, validateProduct, updateProduct);

router.delete("/products/:id", validateId, deleteProduct);
router.delete("/productos/:id", validateId, deleteProduct);

export default router;
