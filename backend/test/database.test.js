import assert from "node:assert/strict";
import { test } from "node:test";
import { createSequelize } from "../src/database/sequelize.js";

test("configures Sequelize for the project's MySQL database", async () => {
  const sequelize = createSequelize({
    host: "localhost",
    port: 3306,
    name: "autoservicio_deportivo",
    user: "test",
    password: "",
  });

  try {
    assert.equal(sequelize.getDialect(), "mysql");
    assert.equal(sequelize.options.host, "localhost");
    assert.equal(sequelize.options.port, 3306);
    assert.equal(sequelize.config.database, "autoservicio_deportivo");
  } finally {
    await sequelize.close();
  }
});
