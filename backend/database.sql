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

-- Datos iniciales de demostracion (Indumentaria y Equipamiento)
-- Solo se insertan si la tabla esta vacia
INSERT INTO products (name, description, price, image, category, active)
SELECT * FROM (SELECT
    'Remera deportiva',
    'Prenda liviana para entrenar con comodidad.',
    24900.00,
    'assets/indumentaria.svg',
    'indumentaria',
    1
) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1);

-- Para insertar todos los datos de demo de una vez si la tabla esta vacia, usar:
-- INSERT INTO products (name, description, price, image, category, active) VALUES
-- ('Remera deportiva', 'Prenda liviana para entrenar con comodidad.', 24900.00, 'assets/indumentaria.svg', 'indumentaria', 1),
-- ('Short de entrenamiento', 'Diseno versatil para actividades al aire libre o gimnasio.', 18900.00, 'assets/indumentaria.svg', 'indumentaria', 1),
-- ('Campera deportiva', 'Una capa liviana para el inicio y el final de cada rutina.', 42900.00, 'assets/indumentaria.svg', 'indumentaria', 1),
-- ('Pelota de futbol', 'Un basico para partidos y practicas recreativas.', 32900.00, 'assets/equipamiento.svg', 'equipamiento', 1),
-- ('Bandas elasticas', 'Set de bandas para sumar variedad al entrenamiento.', 15900.00, 'assets/equipamiento.svg', 'equipamiento', 1),
-- ('Botella deportiva', 'Botella reutilizable para llevar a cada actividad.', 9900.00, 'assets/equipamiento.svg', 'equipamiento', 1);
