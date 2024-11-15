const express = require('express');
const router = express.Router();
const supabase = require("../db/supabase");

// Rota para obter todos os itens
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from("produto")
    .select("id, id_categoria_produto, nome_produto, preco_produto, descricao_produto, url_imagem");

  console.log("Produtos:", data);

  if (error || !data) {
    console.error("Erro ao buscar produtos:", error);
    return res.status(404).json({ message: "Produtos não encontrados" });
  }

  // Buscar promoções ativas
  const { data: promocoes, error: errorPromocoes } = await supabase
    .from('promocoes')
    .select('*')
    .eq('ativo', true);

  if (errorPromocoes) {
    return res.status(500).json({ message: "Erro ao buscar promoções" });
  }

  // Calcular o preço com desconto para os produtos
  const produtosComPromocoes = data.map(produto => {
    const promocao = promocoes.find(p => p.produto_id === produto.id);

    if (promocao) {
      const precoComDesconto = produto.preco_produto - (produto.preco_produto * promocao.valor_desconto / 100);
      return {
        ...produto,
        preco_com_desconto: precoComDesconto.toFixed(2), // Preço com desconto
        promocao_descricao: promocao.descricao,
        valor_desconto: promocao.valor_desconto
      };
    }

    // Se não houver promoção, retorna o produto sem alterações
    return produto;
  });

  res.status(200).json({
    produtos: produtosComPromocoes,
    message: "Produtos carregados com sucesso!",
  });
});

router.get('/:id_categoria_produto', async (req, res) => {
  const { id_categoria_produto } = req.params; // Pegar o ID da categoria da URL
  try {
    const { data: produtos, error: errorProdutos } = await supabase
      .from("produto")
      .select("id, id_categoria_produto, nome_produto, preco_produto, descricao_produto, url_imagem")
      .eq("id_categoria_produto", id_categoria_produto);

    if (errorProdutos || !produtos) {
      return res.status(404).json({ message: "Produtos não encontrados para essa categoria" });
    }
    const { data: promocoes, error: errorPromocoes } = await supabase
      .from('promocoes')
      .select('*')
      .eq('ativo', true);

    if (errorPromocoes) {
      return res.status(500).json({ message: "Erro ao buscar promoções" });
    }

    const produtosComPromocoes = produtos.map(produto => {
      const promocao = promocoes.find(p => p.produto_id === produto.id);

      if (promocao) {
        const precoComDesconto = produto.preco_produto - (produto.preco_produto * promocao.valor_desconto / 100);
        return {
          ...produto,
          preco_com_desconto: precoComDesconto.toFixed(2), 
          promocao_descricao: promocao.descricao,
          valor_desconto: promocao.valor_desconto
        };
      }

      return produto;
    });
    res.status(200).json({
      produtos: produtosComPromocoes
    });

  } catch (err) {
    console.error("Erro ao buscar produtos ou promoções:", err);
    res.status(500).json({ message: "Erro ao buscar dados" });
  }
});


module.exports = router;

