const express = require("express");
const router = express.Router();
const supabase = require("../db/supabase");

router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("produto")
    .select(
      "id, id_categoria_produto, nome_produto, preco_produto, descricao_produto, url_imagem, produto_disponivel"
    );

  console.log("Produtos:", data);

  if (error || !data) {
    console.error("Erro ao buscar produtos:", error);
    return res.status(404).json({ message: "Produtos não encontrados" });
  }

  const { data: promocoes, error: errorPromocoes } = await supabase
    .from("promocoes")
    .select("*")
    .eq("ativo", true);

  if (errorPromocoes) {
    return res.status(500).json({ message: "Erro ao buscar promoções" });
  }

  const produtosComPromocoes = data.map((produto) => {
    const promocao = promocoes.find((p) => p.produto_id === produto.id);

    if (promocao) {
      const precoComDesconto =
        produto.preco_produto -
        (produto.preco_produto * promocao.valor_desconto) / 100;
      return {
        ...produto,
        preco_com_desconto: precoComDesconto.toFixed(2),
        promocao_descricao: promocao.descricao,
        valor_desconto: promocao.valor_desconto,
      };
    }
    return produto;
  });

  res.status(200).json({
    produtos: produtosComPromocoes,
    message: "Produtos carregados com sucesso!",
  });
});

router.get("/:id_categoria_produto", async (req, res) => {
  const { id_categoria_produto } = req.params;
  try {
    const { data: produtos, error: errorProdutos } = await supabase
      .from("produto")
      .select(
        "id, id_categoria_produto, nome_produto, preco_produto, descricao_produto, url_imagem, produto_disponivel"
      )
      .eq("id_categoria_produto", id_categoria_produto)
      .eq("produto_disponivel", true);

    if (errorProdutos || !produtos) {
      return res
        .status(404)
        .json({ message: "Produtos não encontrados para essa categoria" });
    }

    const { data: promocoes, error: errorPromocoes } = await supabase
      .from("promocoes")
      .select("*")
      .eq("ativo", true);

    if (errorPromocoes) {
      return res.status(500).json({ message: "Erro ao buscar promoções" });
    }

    const produtosComPromocoes = produtos.map((produto) => {
      const promocao = promocoes.find((p) => p.produto_id === produto.id);

      if (promocao) {
        const precoComDesconto =
          produto.preco_produto -
          (produto.preco_produto * promocao.valor_desconto) / 100;
        return {
          ...produto,
          preco_com_desconto: precoComDesconto.toFixed(2),
          promocao_descricao: promocao.descricao,
          valor_desconto: promocao.valor_desconto,
        };
      }

      return produto;
    });

    res.status(200).json({
      produtos: produtosComPromocoes,
      message: "Produtos carregados com sucesso!",
    });
  } catch (err) {
    console.error("Erro ao buscar produtos ou promoções:", err);
    res.status(500).json({ message: "Erro ao buscar dados" });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { produto_disponivel } = req.body;

  try {
    const { data, error } = await supabase
      .from('produto')
      .update({ produto_disponivel })
      .eq('id', id);

    if (error) {
      throw error;
    }

    res.status(200).json({ message: "Disponibilidade atualizada com sucesso", data });
  } catch (err) {
    console.error("Erro ao atualizar disponibilidade:", err);
    res.status(500).json({ message: "Erro ao atualizar disponibilidade" });
  }
});

module.exports = router;
