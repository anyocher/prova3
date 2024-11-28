const db = require('../database');

const createUser = (nome, email, callback) => {
  db.run('INSERT INTO users (nome, email) VALUES (?, ?)', [nome, email], function(err) {
    callback(err, this.lastID);
  });
};

module.exports = { createUser };
