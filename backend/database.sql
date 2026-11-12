-- Script de inicializacion para la base de datos MySQL
-- Proyecto: Autoservicio de Articulos Deportivos
-- Ejecutar este script en phpMyAdmin o en la consola de MySQL

CREATE DATABASE IF NOT EXISTS autoservicio_deportivo;
USE autoservicio_deportivo;

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    active TINYINT(1) DEFAULT 1
);


