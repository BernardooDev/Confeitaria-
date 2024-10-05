const express = require('express');
const router = express.Router();
const pool = require('../db');

// Rota para obter todos os itens
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM itens');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao obter itens:', error);
    res.status(500).json({ error: 'Erro ao obter itens' });
  }
});

// Outras rotas relacionadas a pedidos podem ser adicionadas aqui

module.exports = router;
