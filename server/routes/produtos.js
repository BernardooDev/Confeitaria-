const express = require('express');
const router = express.Router();
const supabase = require("../db/supabase");

// Rota para obter todos os itens
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from("produto")
    .select("id, id_categoria_produto, nome_produto, preco_produto, descricao_produto");

  console.log("Produtos:", data);

  if (error || !data) {
    console.error("Erro ao buscar produtos:", error);
    return res.status(404).json({ message: "Produtos não encontrados" });
  }
  res.status(200).json({
    produtos: data, 
    message: "Produtos carregados com sucesso!",
  });
});

router.get('/:id_categoria_produto', async (req, res) => {
  const { id_categoria_produto } = req.params; // Pegar o ID da categoria da URL
  try {
    // Buscar produtos filtrados por categoria
    const { data, error } = await supabase
      .from("produto")
      .select("id, id_categoria_produto, nome_produto, preco_produto, descricao_produto")
      .eq("id_categoria_produto", id_categoria_produto);

    if (error || !data) {
      return res.status(404).json({ message: "Produtos não encontrados para essa categoria" });
    }

    // Retornar a lista de produtos
    res.status(200).json({
      produtos: data
    });
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
});


module.exports = router;

