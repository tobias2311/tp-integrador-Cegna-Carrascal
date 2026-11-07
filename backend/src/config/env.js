import dotenv from "dotenv";

dotenv.config();

function requiredString(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Falta configurar la variable de entorno ${name}`);
  }
  return value;
}

function parsePort(name, value, fallback) {
  const parsed = Number(value ?? fallback);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
    throw new Error(`${name} debe ser un puerto entre 1 y 65535`);
  }
  return parsed;
}

export function loadConfig() {
  return {
    port: parsePort("PORT", process.env.PORT, 3000),
    database: {
      host: requiredString("DB_HOST"),
      port: parsePort("DB_PORT", process.env.DB_PORT, 3306),
      name: requiredString("DB_NAME"),
      user: requiredString("DB_USER"),
      password: process.env.DB_PASSWORD ?? "",
    },
  };
}
