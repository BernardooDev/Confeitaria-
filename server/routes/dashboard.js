const express = require("express");
const router = express.Router();
const supabase = require("../db/supabase");

router.get("/clientes", async (req, res) => {
  try {
    const { data: pedidos, error } = await supabase
      .from("pedido_cliente")
      .select("cliente_id");

    if (error) throw error;

    const clienteCount = {};
    pedidos.forEach(pedido => {
      const { cliente_id } = pedido;
      clienteCount[cliente_id] = (clienteCount[cliente_id] || 0) + 1;
    });

    const topCliente = Object.entries(clienteCount).reduce((acc, [cliente_id, total]) => {
      return total > acc.total ? { cliente_id, total } : acc;
    }, { total: 0 });

    return res.json(topCliente);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/produtos", async (req, res) => {
    try {
      const { data: pedidos, error } = await supabase
        .from("pedido_cliente")
        .select("pedido_produtos");
  
      if (error) throw error;
  
      const produtoCount = {};
      
      pedidos.forEach(pedido => {
        const produtos = pedido.pedido_produtos;
  
        produtos.forEach(produto => {
          const { id, nome, quantidade } = produto;
          produtoCount[id] = {
            nome,
            total: (produtoCount[id]?.total || 0) + quantidade,
          };
        });
      });
  
      const topProduto = Object.entries(produtoCount).reduce((acc, [id, { nome, total }]) => {
        return total > acc.total ? { id, nome, total } : acc;
      }, { total: 0 });
  
      return res.json(topProduto);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });

module.exports = router;
