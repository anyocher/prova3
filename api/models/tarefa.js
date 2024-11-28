const db = require('../database');

const createTarefa = (id_usuario, descricao, nome_setor, prioridade, data_cadastro, callback) => {
  db.run('INSERT INTO Tarefa (id_usuario, descricao, nome_setor, prioridade, data_cadastro) VALUES (?, ?, ?, ?, ?)', 
    [id_usuario, descricao, nome_setor, prioridade, data_cadastro], function(err) {
    callback(err, this.lastID);
  });
};

const getTarefasByStatus = (status, callback) => {
  db.all('SELECT * FROM Tarefa WHERE status = ?', [status], (err, rows) => {
    callback(err, rows);
  });
};

const updateTarefa = (id, status, prioridade, callback) => {
  db.run('UPDATE Tarefa SET status = ?, prioridade = ? WHERE id = ?', [status, prioridade, id], function(err) {
    callback(err);
  });
};

module.exports = { createTarefa, getTarefasByStatus, updateTarefa };
