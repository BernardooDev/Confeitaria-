// server/routes/pedidos.js
const express = require('express');
const router = express.Router();
const db = require('../../db');

// Rota para criar um pedido
router.post('/', (req, res) => {
  const { cliente, itens } = req.body;

  const query = 'INSERT INTO pedidos (cliente, itens) VALUES (?, ?)';
  db.query(query, [cliente, JSON.stringify(itens)], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId });
  });
});

// Outras rotas relacionadas a pedidos podem ser adicionadas aqui

module.exports = router;
