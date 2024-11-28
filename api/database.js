const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./todo.db', (err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados:', err);
  } else {
    console.log('Banco de dados conectado');
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      );
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER NOT NULL,
        descricao TEXT NOT NULL,
        nome_setor TEXT NOT NULL,
        prioridade TEXT CHECK(prioridade IN ('Baixa', 'Média', 'Alta')) NOT NULL,
        data_cadastro TEXT NOT NULL,
        status TEXT CHECK(status IN ('A fazer', 'Fazendo', 'Pronto')) DEFAULT 'A fazer' NOT NULL,
        FOREIGN KEY(id_usuario) REFERENCES users(id)
      );
    `);
  }
});

module.exports = db;
