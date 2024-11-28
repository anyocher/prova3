const express = require('express');
const bodyParser = require('body-parser');
const { createUser } = require('./models/user.js');
const { createTask, getTasksByStatus, updateTask } = require('./models/Task');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('../frontend'));  // Serve os arquivos estáticos do frontend

// Criar um novo usuário
app.post('/api/users', (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.status(400).send('Nome e email são obrigatórios');
  }
  createUser(nome, email, (err, userId) => {
    if (err) {
      return res.status(500).send('Erro ao criar usuário');
    }
    res.status(201).json({ id: userId, nome, email });
  });
});

// Criar uma nova tarefa
app.post('/api/tasks', (req, res) => {
  const { id_usuario, descricao, nome_setor, prioridade, data_cadastro } = req.body;
  if (!descricao || !nome_setor || !prioridade || !data_cadastro) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }
  createTask(id_usuario, descricao, nome_setor, prioridade, data_cadastro, (err, taskId) => {
    if (err) {
      return res.status(500).send('Erro ao criar tarefa');
    }
    res.status(201).json({ id: taskId, descricao, nome_setor, prioridade, data_cadastro, status: 'A fazer' });
  });
});

// Buscar tarefas por status
app.get('/api/tasks/:status', (req, res) => {
  const { status } = req.params;
  getTasksByStatus(status, (err, tasks) => {
    if (err) {
      return res.status(500).send('Erro ao buscar tarefas');
    }
    res.status(200).json(tasks);
  });
});

// Atualizar o status ou prioridade de uma tarefa
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { status, prioridade } = req.body;
  if (!status && !prioridade) {
    return res.status(400).send('Status ou prioridade são obrigatórios');
  }
  updateTask(id, status, prioridade, (err) => {
    if (err) {
      return res.status(500).send('Erro ao atualizar tarefa');
    }
    res.status(200).send('Tarefa atualizada com sucesso');
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
