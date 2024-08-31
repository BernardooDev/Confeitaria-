// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

// Exemplo de rota para inserir dados
app.post('/api/pedidos', (req, res) => {
  const { cliente, itens } = req.body;

  const query = 'INSERT INTO pedidos (cliente, itens) VALUES (?, ?)';
  db.query(query, [cliente, JSON.stringify(itens)], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
