import cors from "cors";
import express from "express";
import productsRouter from "./api/routes/products.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    const fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Hola mundo desde un server de Express.js");
});

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use("/api", productsRouter);

export default app;
