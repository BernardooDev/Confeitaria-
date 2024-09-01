const express = require('express');
const router = express.Router();
const pool = require('../../db'); // Ajuste o caminho conforme necessário

// Obter todas as categorias
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categorias');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao obter categorias:', error);
    res.status(500).json({ error: 'Erro ao obter categorias' });
  }
});

// Obter categoria por ID e seus itens
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Buscar a categoria com o ID especificado
    const [categoriaRows] = await pool.query('SELECT * FROM categorias WHERE id = ?', [id]);

    // Buscar os itens que pertencem à categoria com o ID especificado
    const [itensRows] = await pool.query('SELECT * FROM itens WHERE category_id = ?', [id]);

    // Verificar se a categoria foi encontrada
    if (categoriaRows.length === 0) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    // Retornar a categoria e seus itens
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
