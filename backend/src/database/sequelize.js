import { Sequelize } from "sequelize";

export function createSequelize(databaseConfig) {
  return new Sequelize(databaseConfig.name, databaseConfig.user, databaseConfig.password, {
    host: databaseConfig.host,
    port: databaseConfig.port,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
}
