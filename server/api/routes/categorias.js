const express = require('express');
const router = express.Router();
const pool = require('../../db'); // Ajuste o caminho conforme necessário

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categorias');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao obter categorias:', error);
    res.status(500).json({ error: 'Erro ao obter categorias' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [categoriaRows] = await pool.query('SELECT * FROM categorias WHERE id = ?', [id]);
    const [itensRows] = await pool.query('SELECT * FROM itens WHERE category_id = ?', [id]);

    if (categoriaRows.length === 0) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    res.json({
      categoria: categoriaRows[0],
      itens: itensRows
    });
  } catch (error) {
    console.error('Erro ao obter categoria e itens:', error);
    res.status(500).json({ error: 'Erro ao obter categoria e itens' });
  }
});

module.exports = router;
