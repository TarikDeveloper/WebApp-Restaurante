const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

// Crie e preencha as tabelas
db.serialize(() => {
  // ... código para criar e preencher as tabelas
});

module.exports = db;
